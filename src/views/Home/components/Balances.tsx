import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import SushiIcon from '../../../components/SushiIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
// import useSushi from '../../../hooks/useSushi'
// import { getSushiAddress, getSushiSupply } from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useBest from '../../../hooks/useBest'
import { getTotalSupply } from '../../../utils/erc20'
import Card from './Card'
import CardContent from './CardContent'
import Value from './Value'

const PendingRewards: React.FC = () => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  const [farms] = useFarms()
  const allStakedValue = useAllStakedValue()

  if (allStakedValue && allStakedValue.length) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const sumWeth = farms.reduce(
      (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
      0,
    )
  }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [end, sumEarning])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const best = useBest()
  const sushiBalance = useTokenBalance(best.address)
  const { account, ethereum }: { account: any; ethereum: any } = useWallet()

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = new BigNumber(await getTotalSupply(ethereum, best.address))
      setTotalSupply(supply)
    }
    if (best) {
      fetchTotalSupply()
    }
  }, [best, ethereum, setTotalSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ flex: 1 }}>
                <Label text="Your BEST Balance" />
                <StyledBalanceWrapper>
                  <SushiIcon />
                  <Spacer size='md' />
                  <Value
                    value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
                  />
                </StyledBalanceWrapper>
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards />
            {' '}
            <span style={{ color: '#FFD201' }}>BEST</span>
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <Label text="Total BEST Supply" />
          <Value
            value={(!!account && totalSupply) ? getBalanceNumber(totalSupply) : 'Locked'}
          />
        </CardContent>
        <Footnote>
          New rewards per block
          <FootnoteValue>1,000 <span style={{ color: '#FFD201' }}>BEST</span></FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-size: 14px;
  padding: 8px 38px;
  color: #000000;
  border-top: solid 1px #FFE9C7;
`
const FootnoteValue = styled.div`
  font-family: 'Roboto Mono', monospace;
  float: right;
`

const StyledWrapper = styled.div`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  display: flex;
`

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
`

const StyledBalanceWrapper = styled.div`
  display: flex;
  align-items: center;
`

export default Balances
