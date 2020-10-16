import React, { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import Page from '../../components/Page'
import VESTCards from './components/VESTCards'
import Switcher from './components/Switcher'
import useFetchAssets, { NftAssets } from '../../hooks/nft/useFetchAssets'

const VestNFTPage: React.FC = () => {
  const { assets, assetsTypeList } = useFetchAssets()
  console.log('VestNFTPage::useFetchAssets assets:', assets, 'assetsTypeList:', assetsTypeList)
  const findAssetsByType = useCallback((type: string) => {
    // eslint-disable-next-line array-callback-return
    const found = assets.filter(item => {
      const isMatchType = item.traits.some(trait => (
        trait.trait_type === 'Type' && trait.value === type
      ))
      if (isMatchType) return item
    })
    return found
  }, [assets])

  const [selectedList, setSelectedList] = useState<Array<NftAssets>>([])
  const handleSwitcherChange = useCallback((name: string) => {
    const list = findAssetsByType(name)
    setSelectedList(list)
  }, [findAssetsByType])

  useEffect(() => {
    if (assets.length && assetsTypeList.length) {
      const initList = findAssetsByType(assetsTypeList[0])
      setSelectedList(initList)
    }
  }, [assets.length, assetsTypeList, findAssetsByType])

  return (
    <StyledPageWrapper>
      <Page showBgColor={false}>
        <StyledContainer>
          <Switcher switcherList={assetsTypeList} onChange={handleSwitcherChange} />
          <VESTCards selectedList={selectedList} />
        </StyledContainer>
      </Page>
    </StyledPageWrapper>
  )
}

const StyledPageWrapper = styled.div`
  background-color: rgba(8,8,8,0.4);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
`

const StyledContainer = styled.div`
  box-sizing: border-box;
  margin: 0 auto;
  padding-top: 60px;
  max-width: 600px;
  width: 600px;
`

export default VestNFTPage
