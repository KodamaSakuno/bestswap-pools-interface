import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import Button from '../../components/Button'
import Card from '../../components/Card'
import CardContent from '../../components/CardContent'
import CardIcon from '../../components/CardIcon'
import Label from '../../components/Label'
import useAccelerator from '../../hooks/useAccelerator'
import useApproveNFT from '../../hooks/useApproveNFT'
import useStakeNFT from '../../hooks/useStakeNFT'
import useUnstakeNFT from '../../hooks/useUnstakeNFT'

interface HoldingProps {
  symbol: string,
  tokenId: string,
  quality: string,
  approved: boolean,
  staking: boolean,
  onRefresh: () => void,
}

const Holding: React.FC<HoldingProps> = ({ symbol, tokenId, quality, approved, onRefresh, staking }) => {
  const { address } = useAccelerator(symbol)
  const { onApprove } = useApproveNFT(symbol, address)
  const { onStake } = useStakeNFT(symbol)
  const { onUnstake } = useUnstakeNFT(symbol)

  const [pendingTx, setPendingTx] = useState(false)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>{ tokenId }</CardIcon>
            <Label text={`Quality: ${quality}`} />
          </StyledCardHeader>
          <StyledCardActions>
            {(staking ? (
              <Button
                disabled={pendingTx}
                text={pendingTx ? 'Unstaking' : 'Unstake'}
                onClick={async () => {
                  setPendingTx(true)
                  if (await onUnstake()) {
                    onRefresh()
                  }
                  setPendingTx(false)
                }}
              />
            ) : !approved ? (
              <Button
                disabled={pendingTx}
                text={pendingTx ? 'Approving' : 'Approve'}
                onClick={async () => {
                  setPendingTx(true)
                  if (await onApprove(tokenId)) {
                    onRefresh()
                  }
                  setPendingTx(false)
                }}
              />
              ) : (
              <Button
                disabled={pendingTx}
                text={pendingTx ? 'Staking' : 'Stake'}
                onClick={async () => {
                  setPendingTx(true)
                  if (await onStake(tokenId)) {
                    onRefresh()
                  }
                  setPendingTx(false)
                }}
              />
            ))}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Holding
