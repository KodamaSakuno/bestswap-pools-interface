import React from 'react'
import styled from 'styled-components'
import FarmSingleToken from '../../../assets/img/farm-single-token.png'

const FarmSingleTokenIcon: React.FC = () => {
  return <StyledImage src={FarmSingleToken} alt="icon" />
}

const StyledImage = styled.img`
  display: block;
  margin: 0;
  padding: 0;
  height: 120px;
  width: 120px;
`

export default FarmSingleTokenIcon
