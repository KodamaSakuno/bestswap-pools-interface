import React from 'react'
import styled from 'styled-components'
import { transparentize } from 'polished'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
  background: ${(props) => transparentize(0.1, props.theme.color.white)};
  border: 1px solid ${(props) => props.theme.color.white}ff;
  border-radius: 3px;
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.white};
  display: flex;
  flex: 1;
  flex-direction: column;
`

export default Card
