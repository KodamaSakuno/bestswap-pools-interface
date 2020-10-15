import React from 'react'
import styled from 'styled-components'

export interface TokenIconProps {
  path: string
}

const TokenIcon: React.FC<TokenIconProps> = ({ path }) => {
  return <StyledImage src={path} alt="icon" />
}

const StyledImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  height: 120px;
  width: 120px;
`

export default TokenIcon
