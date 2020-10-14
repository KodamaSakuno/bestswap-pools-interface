import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { VestNFT } from '../../../constants/vestNFTs'

export interface VESTCardProps {
  info: Omit<VestNFT, 'attributes'>
}

const VESTCard: React.FC<VESTCardProps> = ({ info }) => {
  const { displayName, bestCost, image, levelLong, levelShort } = info
  const [imagePath, setImagePath] = useState('')
  const loadImage = (name: string): void => {
    import(`../../../assets/img/vestnft/${name}`).then(path => {
      console.log('FarmCards::FarmCard:loadTokenImage path:', path)
      setImagePath(path.default)
    })
  }
  useEffect(() => {
    loadImage(image)
  })

  return (
    <StyledCardWrapper>
      <div>
        <StyledTriangleBig />
        <StyledTriangleSmall />
        <StyledLevelWrapper>
          <StyledLevelText>{levelLong}</StyledLevelText>
          <StyledLevelText>{levelShort}</StyledLevelText>
        </StyledLevelWrapper>
      </div>
      <StyledImage src={imagePath} alt='card-image' />
      <StyledCost>{bestCost} BEST</StyledCost>
      <StyledButton>{displayName}</StyledButton>
    </StyledCardWrapper>
  )
}

const StyledCardWrapper = styled.div`
  box-sizing: border-box;
  width: calc((600px - 20px * 2) / 3);
  background-color: #ffffff;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 34px;
  padding-bottom: 14px;
  position: relative;
`

const StyledTriangleBig = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 56px 56px 0;
  border-color: transparent #FFDD01 transparent transparent;
  position: absolute;
  top: 0;
  right: 0;
`

const StyledTriangleSmall = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 16px 16px 0;
  border-color: transparent #FFFFFF transparent transparent;
  position: absolute;
  top: 0;
  right: 0;
`

const StyledLevelWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 4px;
  right: 4px;
  transform: rotate(45deg);
`

const StyledLevelText = styled.p`
  margin: 0;
  color: #000000;
  font-size: 10px;
  font-weight: 400;
  line-height: 1;
  text-align: center;
`

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 105px;
  width: auto;
  margin-bottom: 18px;
`

const StyledCost = styled.div`
  color: #000000;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin-bottom: 22px;
`

const StyledButton = styled.button`
  display: block;
  width: 146px;
  height: 34px;
  color: #F5C523;
  background-color: #000000;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  border-radius: 5px;
  margin: 0 auto;
  border: 0;
  cursor: pointer;
  outline: none;
  &:hover {
    background-color: ${lighten(0.15, '#000000')};
  }
`

export default VESTCard
