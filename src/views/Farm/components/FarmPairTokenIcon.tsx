import React from 'react'
import styled from 'styled-components'
import FarmPairToken from '../../../assets/img/farm-pair-token.png'

const FarmPairTokenIcon: React.FC = () => {
  return <StyledImage src={FarmPairToken} alt="icon" />
}

const StyledImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  height: 120px;
  width: auto;
`

export default FarmPairTokenIcon
