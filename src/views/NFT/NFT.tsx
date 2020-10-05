import React from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Loader from "../../components/Loader"
import PageHeader from "../../components/PageHeader"
import useAccelerator from "../../hooks/useAccelerator"
import useHoldings from "../../hooks/useHoldings"
import useNFT from "../../hooks/useNFT"
import useStakedNFT from "../../hooks/useStakedNFT"
import Holding from './Holding'

const NFT: React.FC = () => {
  const { nftSymbol } = useParams<{ nftSymbol: string }>()
  const { name, symbol, address } = useNFT(nftSymbol)
  const { address: accAddress } = useAccelerator(nftSymbol)
  const [holdings, fetchHoldings] = useHoldings(address)
  const [staked, quality, fetchStaked] = useStakedNFT(symbol)

  const fetch = () => {
    fetchHoldings()
    fetchStaked()
  }
  const stakedHolding = staked && quality ? [{ tokenId: staked, quality, approved: accAddress }] : []
  const allHoldings = [...holdings, ...stakedHolding].sort((a, b) => {
    return Number(a.tokenId) - Number(b.tokenId)
  })
  const rows = allHoldings.reduce<any[][]>(
    (holdingRows, holding, i) => {
      const newHoldingRows = [...holdingRows]
      if (newHoldingRows[newHoldingRows.length - 1].length === 3) {
        newHoldingRows.push([holding])
      } else {
        newHoldingRows[newHoldingRows.length - 1].push(holding)
      }
      return newHoldingRows
    },
    [[]],
  )

  return (
    <>
      <PageHeader
        icon=""
        title={name}
      />
      <StyledCards>
        {!!rows[0].length ? (
          rows.map((row, i) => (
            <StyledRow key={i}>
              {row.map(({ tokenId, quality, approved }, j) => (
                <React.Fragment key={j}>
                  <Holding symbol={symbol} tokenId={tokenId} quality={quality} approved={approved === accAddress} staking={staked === tokenId}
                    onRefresh={fetch}
                  />
                  {(j === 0 || j === 1) && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))
        ) : (
          <StyledLoadingWrapper>
            <Loader text="Cooking the rice ..." />
          </StyledLoadingWrapper>
        )}
      </StyledCards>
    </>
  )
}

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

export default NFT