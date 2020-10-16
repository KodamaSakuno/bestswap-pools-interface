import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import LevelImage from '../../../assets/img/vestnft/vestnft-card-level.png'
import { VestMetadata } from './types'
import capitalize from '../../../utils/capitalize'

export interface VESTCardProps {
  info: VestMetadata
}

interface StyledCardWrapperProps {
  bgColor?: string
}

const VESTCard: React.FC<VESTCardProps> = ({ info }) => {
  const { image, name, attributes } = info
  const bestCost = attributes.find(trait => trait.trait_type === 'Vest Value').value
  const level = attributes.find(trait => trait.trait_type === 'Level').value.toString()
  const type = attributes.find(trait => trait.trait_type === 'Type').value.toString()
  const backgroundColor = attributes.find(trait => trait.trait_type === 'Main Color').value.toString()
  const displayLevel = (level: string): string => {
    const _level = Number(level)
    if (_level === 2) return 'G1'
    if (_level >= 3) return 'K1'
    return 'P1'
  }
  const [imagePath, setImagePath] = useState('')
  const loadNFTImage = (name: string): void => {
    if (name.includes('local::')) {
      import(`../../../assets/img/vestnft/${name.replace('local::', '')}`).then(path => {
        setImagePath(path.default)
      }).catch(error => {
        console.error('VESTCard::loadNFTImage', error)
        setImagePath('')
      })
    } else {
      setImagePath(name)
    }
  }

  useEffect(() => {
    loadNFTImage(image)
  }, [image])

  return (
    <StyledCardWrapper bgColor={backgroundColor}>
      <StyledTypeText>{capitalize(type)}</StyledTypeText>
      <StyledLevelWrapper>
        <StyledLevelText>{displayLevel(level)}</StyledLevelText>
      </StyledLevelWrapper>
      <StyledImage src={imagePath} alt='card-image' />
      <StyledName>{name.toUpperCase()}</StyledName>
      <StyledCost>{bestCost} BEST</StyledCost>
    </StyledCardWrapper>
  )
}

const StyledCardWrapper = styled.div<StyledCardWrapperProps>`
  box-sizing: border-box;
  width: calc((600px - 20px * 2) / 3);
  background-color: ${props => props.bgColor || '#ffffff'};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 34px;
  padding-bottom: 14px;
  position: relative;
`

const StyledLevelWrapper = styled.div`
  width: 34px;
  height: 38px;
  background-image: url(${LevelImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 8px;
`

const StyledLevelText = styled.p`
  margin-top: 7px;
  color: #FEFEFE;
  font-size: 20px;
  font-weight: 500;
  line-height: 1;
  text-align: center;
`

const StyledTypeText = styled.div`
  color: #000000;
  font-size: 14px;
  font-weight: 400;
  line-height: 1;
  position: absolute;
  top: 10px;
  left: 10px;
`

const StyledImage = styled.img`
  display: block;
  margin: 0 auto;
  height: 150px;
  width: auto;
  margin-bottom: 12px;
`

const StyledName = styled.div`
  color: #000000;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
  margin-bottom: 6px;
`

const StyledCost = styled.div`
  color: #000000;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
`

// const StyledButton = styled.button`
//   display: block;
//   width: 146px;
//   height: 34px;
//   color: #F5C523;
//   background-color: #000000;
//   font-size: 10px;
//   font-weight: 600;
//   line-height: 1;
//   text-align: center;
//   border-radius: 5px;
//   margin: 0 auto;
//   border: 0;
//   cursor: pointer;
//   outline: none;
//   &:hover {
//     background-color: ${lighten(0.15, '#000000')};
//   }
// `

export default VESTCard
