import React from 'react'
import styled from 'styled-components'
import VESTCard from './VESTCard'
import { VestNFT } from '../../../constants/vestNFTs'

export interface VESTCardsProps {
  selectedList: Array<VestNFT>
}

const VESTCards: React.FC<VESTCardsProps> = ({ selectedList }) => {
  const rows = selectedList.reduce<Array<Array<VestNFT>>>(
    (cardRows, card) => {
      const newCardRows = [...cardRows]
      if (newCardRows[newCardRows.length - 1].length === 3) {
        newCardRows.push([card])
      } else {
        newCardRows[newCardRows.length - 1].push(card)
      }
      return newCardRows
    },
    [[]],
  )

  return (
    <StyledCards>
      {!!rows[0].length && (
        rows.map((cardRow, i) => (
          <StyledRow key={`row-${i}`}>
            {cardRow.map((card, j) => (
              <React.Fragment key={`card=${j}`}>
                <VESTCard info={card} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      )}
    </StyledCards>
  )
}

const StyledCards = styled.div`
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledSpacer = styled.div`
  height: 20px;
  width: 20px;
`
export default VESTCards
