import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'
import { useWallet } from 'use-wallet'
import BigNumber from 'bignumber.js'

import web3 from '../../web3/'

import Page from '../../components/Page'
import useReferral from '../../hooks/useReferral'
import useExplorer from '../../hooks/useExplorer'
import RefABI from '../../constants/abi/Ref.json'

import "./index.css"
import theme from '../../theme'
import { setCookie } from '../../utils/cookie'
import { decryptText, encryptText } from '../../utils/compress'
import { getDisplayBalance } from '../../utils/formatBalance'

const Referral: React.FC = () => {
  const [link, setLink] = useState('')
  const [ invitedNum, setInvitedNum ] = useState(0)
  const [ rebateNum, setRebateNum ] = useState<BigNumber>(new BigNumber(0))
  const [ rebatePercent ] = useState(0.07)
  const [ invitedList, setInvitedList ] = useState([])
  const [ rebateScore, setRebateScore ] = useState({})
  const history = useHistory()

  const { account, reset } = useWallet()
  const RefAddress = useReferral()
  const Explorer = useExplorer()

  const queryParse = (search = window.location.search) => {
    if (!search) return {}
    const queryString = search[0] === '?' ? search.substring(1) : search
    const query: any = {}
    queryString
        .split('&')
        .forEach(queryStr => {
            const [key, value] = queryStr.split('=')
            if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
        })
    return query
  }

  function copyToClipboard (link: string): any {
    const text = link
    if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      var textarea = document.createElement('textarea')
      textarea.textContent = text
      textarea.style.position = 'fixed' // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea)
      textarea.select()
      try {
        document.execCommand('copy')
        return // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.error('failed')
        return
      } finally {
        document.body.removeChild(textarea)
      }
    }
  }

  function rawSha3ToAddress(raw: string): any {
    return '0x' + raw.substring(raw.length - 40, raw.length)
  }

  function toPlainString(num: number): string {
    return (''+num).replace(/(-?)(\d*)\.?(\d+)e([+-]\d+)/,
      function(a,b,c,d,e) {
        return e < 0
          // @ts-ignore
          ? b + '0.' + Array(1-e-c.length).join(0) + c + d
          // @ts-ignore
          : b + c + d + Array(e-d.length+1).join(0)
      });
  }

  // @ts-ignore
  const Ref: any = new web3.eth.Contract(RefABI, RefAddress.address)
  let mySubordinates = new Set()
  let myRebateDict: any = {}
  useEffect(() => {
    if (window.location.search) {
      const addr = decryptText(queryParse().l)
      setCookie('invite_id', addr, 9999)
      history.push('./')
    }
    let text = ''
    if (account === null) text = 'Unlock Your Wallet First'
    else text = window.location.origin + '/referral?l=' + encryptText(account)
    setLink(text)
    if (account) {
      Ref.getPastEvents('ReferrerSet', {
        fromBlock: 0,
        toBlock: 'latest'
      }, (error1: any, res1: any) => {
        if (error1) console.error(error1)
        res1.forEach((item: any) => {
          let refRaw = web3.utils.toHex(item.raw.topics[2])
          refRaw = rawSha3ToAddress(refRaw)
          let finalAddress: string
          if (refRaw.toLocaleLowerCase() === account.toLocaleLowerCase()) {
            finalAddress = rawSha3ToAddress(web3.utils.toHex(item.raw.topics[1]))
            mySubordinates.add(finalAddress)
          }
        })
        setInvitedList(Array.from(mySubordinates.values()))
        setInvitedNum(mySubordinates.size)
      })
      Ref.getPastEvents('ScoreAdded', {
        fromBlock: 0,
        toBlock: 'latest'
      }, (error2: any, res2: any) => {
        if (error2) console.error(error2)
        // @ts-ignore
        res2.forEach((item2: any, index: number) => {
          let refRaw2 = web3.utils.toHex(item2.raw.topics[2])
          refRaw2 = rawSha3ToAddress(refRaw2)
          
          if (refRaw2.toLocaleLowerCase() === account.toLocaleLowerCase()) {
            let subRaw = web3.utils.toHex(item2.raw.topics[1])
            subRaw = rawSha3ToAddress(subRaw)
            if (myRebateDict[subRaw]) myRebateDict[subRaw] += parseInt(item2.raw.data, 16) * rebatePercent
            else myRebateDict[subRaw] = 0 + parseInt(item2.raw.data, 16) * rebatePercent
          }
        })
        console.log(myRebateDict)
        setRebateScore(myRebateDict)
      })

      Ref.methods.score(account).call().then((score: any) => {
        setRebateNum(new BigNumber(score * rebatePercent))
      })
    }
    // eslint-disable-next-line
  }, [account, reset])

  function InvitedDashboard() {
    const dashboardHtml = (
      <div>
        <h3 className="dashboard-title">
          Dashboard
        </h3>
        <div className="dashboard-card">
          <div className="dashboard-card-invited">
            <p className="dashboard-card-invited-title">
              Invited
            </p>
            <p className="dashboard-card-invited-value">
              {invitedNum}
              <span>People</span>
            </p>
          </div>
          <div className="dashboard-card-col">
            <div className="dashboard-card-col-label">
              <p className="dashboard-card-col-label-value">
                {getDisplayBalance(rebateNum)}
                <span>BEST ({Math.round(rebatePercent * 100)}%)</span>
              </p>
              <p className="dashboard-card-col-label-title">
                Rebate
              </p>
            </div>
          </div>
        </div>
        <div className="address-list">
          <h3 className="address-list-title">
            Invited People
          </h3>
          <AddressList list={invitedList} />
          { invitedList.length ? null : <p className="address-list-entry">No invited people</p> }
        </div>
      </div>
    )
    const notLogged = (
      <div>
        <h3 className="dashboard-title">
          Dashboard
        </h3>
        <div className="dashboard-card">
          <div className="dashboard-card-invited">
            <p className="dashboard-card-invited-title">
              Not logged
            </p>
          </div>
        </div>
      </div>
    )
    if (account) return dashboardHtml
    else return notLogged
  }

  function AddressList(props: any): any {
    return props.list.map((item: any, index: number) => {
      // @ts-ignore
      console.log(rebateScore[item])
      const itemLink = Explorer.link + item
      // @ts-ignore
      let result = rebateScore[item]
      result = toPlainString(result / 1e18)
      return (
        <p className="address-list-entry">
          {index + 1}. <a href={itemLink} className="address-list-item">{item}</a> [{result}]
        </p>
      )
    })
  }

  return (
    <Page>
      <StyledReferralBox>
        <span style={relTitleStyle}>Referral</span>
        <div style={commonDivStyle}>
          <input disabled style={relLinkInputStyle} value={link} />
          <button className="rel-copy-btn" onClick={copyToClipboard(link)}>Copy</button>
        </div>
        <InvitedDashboard />
        <div className="ref-help">
          <h4>
            Invitation description:
          </h4>
          <p>
            Step1. Copy your invitation link and send it to friends
            <br />
            Step2. You will get rewards if your friends bind addresses to participate in mining
          </p>
          <h4>
            Referral bonus
          </h4>
          <p>
            1. You will receive an additional 7% dividend of all mining rewards obtained through your referral link
            <br />
            2. When only your invited friends obtain a certain amount of BEST through mining, you will have the opportunity to get accelerated buff NFT, which can only be pledged in the BUSD pool
            <br />
            1) When your invited friends dig out 1000BEST, they can get additional 0.5 times faster buff
            <br />
            2) When your invited friends dig out 10,000 BEST, they can get additional 1.5 times faster buff
            <br />
            3) When your invited friends dig out 100,000 BEST, they can get the 3x speed buff
          </p>
        </div>
      </StyledReferralBox>
    </Page>
  )
}

const StyledReferralBox = styled.div`
  width: 100%;
`

const commonDivStyle = {
  width: "auto",
  display: "flex",
  padding: "0 300px",
  marginTop: "20px",
}

const relTitleStyle = {
  marginTop: "30px",
  fontSize: "30px",
  textAlign: "center" as const,
  display: "block",
  color: theme.color.yellow
}

const relLinkInputStyle = {
  outline: "none",
  height: "40px",
  width: "calc(100% - 57px)",
  border: "2px solid " + theme.color.yellow,
  borderTopLeftRadius: "999px",
  borderBottomLeftRadius: "999px",
  borderRight: "none",
  padding: "0 20px",
  color: "white"
}

export default Referral
