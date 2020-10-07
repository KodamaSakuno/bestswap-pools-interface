import React from 'react'
import styled from 'styled-components'

interface CardIconProps {
  children?: React.ReactNode,
}

const CardIcon: React.FC<CardIconProps> = ({ children }) => (
  <StyledCardIcon>
    {children}
  </StyledCardIcon>
)

const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.color.white};
  height: 50px;
  width: 50px;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: ${props => props.theme.spacing[3]}px auto ${props => props.theme.spacing[3]}px;
`

export default CardIcon