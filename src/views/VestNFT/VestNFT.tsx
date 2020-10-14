import React, { useState } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import VESTCards from './components/VESTCards'
import Switcher from './components/Switcher'
import { VestNFT, VestNFTs } from '../../constants/vestNFTs'

const VestNFTPage: React.FC = () => {
  const [selectedList, setSelectedList] = useState<Array<VestNFT>>(VestNFTs.holder)
  const handleSwitcherChange = (name: string) => {
    // @ts-ignore
    setSelectedList(VestNFTs[name])
  }

  return (
    <Page>
      <StyledContainer>
        <Switcher switcherList={Object.keys(VestNFTs)} onChange={handleSwitcherChange} />
        <VESTCards selectedList={selectedList} />
      </StyledContainer>
    </Page>
  )
}

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 60px;
  max-width: 600px;
  width: 600px;
`

export default VestNFTPage
