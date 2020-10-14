import React from 'react'
import styled from 'styled-components'
import BestImage from '../../../assets/img/best-icon.png'

const BestIcon: React.FC = () => {
  return (
    <StyledImage src={BestImage} alt='best-icon' />
  )
}

const StyledImage = styled.img`
  width: 45px;
  height: 45px;
  margin-top: 4px;
  display: inline-block;
`

export default BestIcon
