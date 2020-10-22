import React from 'react'
import styled from 'styled-components'
import VESTCard from './VestCard'
import { VestMetadata } from './types'

export interface VESTCardsProps {
  selectedList: Array<VestMetadata>,
  tab: string
}

const VESTCards: React.FC<VESTCardsProps> = ({ selectedList, tab }) => {
  const rows = selectedList.reduce<Array<Array<VestMetadata>>>(
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
  if (rows[0].length > 0) {
    return (
      <StyledCards>
        {!!rows[0].length && (
          rows.map((cardRow, i) => (
            <StyledRow key={`row-${i}`}>
              {cardRow.map((card, j) => (
                <React.Fragment key={`card=${j}`}>
                  <VESTCard info={card} tab={tab} />
                  {(j === 0 || j === 1) && <StyledSpacer />}
                </React.Fragment>
              ))}
            </StyledRow>
          ))
        )}
      </StyledCards>
    )
  } else {
    return (
      <StyledCards>
        <StyledH1>No data pending...</StyledH1>
      </StyledCards>
    )
  }

  
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

const StyledH1 = styled.h1`
  color: #fff;
  text-align: center;
  font-size: 32px;
  font-weight: normal;
`

export default VESTCards
