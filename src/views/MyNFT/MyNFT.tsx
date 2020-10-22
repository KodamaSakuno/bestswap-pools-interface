import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import web3 from '../../web3/'
import { useWallet } from 'use-wallet'
import Page from '../../components/Page'
import useRefReward from '../../hooks/useRefReward'
import Switcher from './components/Switcher'
import Button from '../../components/Button'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import useFetchMetadata, {
  TokenItem,
  VestMetadata,
} from '../../hooks/nft/useFetchMetadata'
import useMyNFT from '../../hooks/useMyNFT'
import useAcc from '../../hooks/useAcc'
import VESTCards from './components/VestCards'
import AcceleratorABI from '../../constants/abi/StakingRewardAccelerator.json'
import { ACC } from '../../constants/acc'

interface MetadataWithStatus extends VestMetadata {
  rewardStatus: boolean
  tokenId: number
  claimId: number
  balance: number
  staked: boolean
  acc: number
}

const switcherList = ['pending', 'received', 'staked']
const tokenList: Array<TokenItem> = [
  {
    tokenId: 1,
  },
  {
    tokenId: 2,
  },
  {
    tokenId: 3,
  },
]

const findAssetsByType = (
  name: string,
  metadataList: Array<VestMetadata>,
  rewardStatus: Array<boolean>,
  tokenList: Array<TokenItem>,
  balance: Array<any>,
  NFTId: string
): Array<MetadataWithStatus> => {
  const metadataWithStatus = metadataList.map((data, i) => {
    let resBody = {
      ...data,
      rewardStatus: rewardStatus[i],
      tokenId: tokenList[i].tokenId,
      claimId: i,
      balance: Number(balance[i]),
      staked: false,
      acc: 0
    }
    if (parseInt(NFTId) === resBody.tokenId) resBody.staked = true
    if (resBody.tokenId === 1) resBody.acc = 50
    if (resBody.tokenId === 2) resBody.acc = 150
    if (resBody.tokenId === 3) resBody.acc = 300
    return resBody
  })

  const pendingRewards = metadataWithStatus.filter(
    (item) => item.rewardStatus === true,
  )
  const receivedRewards = metadataWithStatus.filter(
    (item) => item.balance > 0,
  )
  const stakedRewards = metadataWithStatus.filter(
    (item) => item.staked == true,
  )

  let list: Array<MetadataWithStatus> = []

  switch (name) {
    case "pending":
      list = pendingRewards
      break
    case "received":
      list = receivedRewards
      break
    case "staked":
      list = stakedRewards
      break
    default:
      list = []
      break
  }
  console.log(
    'MyNFTPage::findAssetsByType metadataWithStatus:',
    metadataWithStatus,
    'list:',
    list,
  )
  return list
}

const MyNFTPage: React.FC = () => {
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const { rewardStatus } = useRefReward()
  const { metadataList } = useFetchMetadata(tokenList)
  const {NFTBalance} = useMyNFT()
  const {staked} = useAcc()

  const [selectedList, setSelectedList] = useState<Array<MetadataWithStatus>>(
    [],
  )
  const [ tab, setTab ] = useState('pending')

  const handleSwitcherChange = useCallback(
    async (name: string) => {
      setTab(name)
      const accelerator = new web3.eth.Contract(AcceleratorABI as any, ACC)
      // @ts-ignore
      const NFTId = await accelerator.methods.getStaked(account).call()
      const list = findAssetsByType(name, metadataList, rewardStatus, tokenList, NFTBalance, NFTId)
      setSelectedList(list)
    },
    [NFTBalance, metadataList, rewardStatus],
  )

  useEffect(() => {
    if (account) {
      const accelerator = new web3.eth.Contract(AcceleratorABI as any, ACC)
      // @ts-ignore
      accelerator.methods.getStaked(account).call().then(res => {
        const initList = findAssetsByType(
          'pending',
          metadataList,
          rewardStatus,
          tokenList,
          NFTBalance,
          res
        )
        setSelectedList(initList)
      })
    }
  }, [NFTBalance, account, metadataList, rewardStatus])

  return (
    <StyledPageWrapper>
      <Page showBgColor={false}>
        {account ? (
          <StyledContainer>
            <Switcher
              switcherList={switcherList}
              onChange={handleSwitcherChange}
            />
            <VESTCards selectedList={selectedList} tab={tab} />
          </StyledContainer>
        ) : (
          <StyledUnlockWrapper>
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </StyledUnlockWrapper>
        )}
      </Page>
    </StyledPageWrapper>
  )
}

const StyledPageWrapper = styled.div`
  background-color: rgba(8, 8, 8, 0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 60px;
  max-width: 600px;
  width: 600px;
`

const StyledUnlockWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

export default MyNFTPage
