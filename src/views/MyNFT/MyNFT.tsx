import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Page from '../../components/Page'
import useRefReward from '../../hooks/useRefReward'
import Switcher from './components/Switcher'
import Button from '../../components/Button'
import WalletProviderModal from '../../components/WalletProviderModal'
import useModal from '../../hooks/useModal'
import useFetchMetadata, {
  TokenItem,
  VestMetadata,
} from '../../hooks/nft/useFetchMetadata'
import VESTCards from './components/VestCards'

interface MetadataWithStatus extends VestMetadata {
  rewardStatus: boolean
  tokenId: number
  claimId: number
}

const MyNFTPage: React.FC = () => {
  const switcherList = ['pending', 'received']
  const tokenList: Array<TokenItem> = [
    {
      tokenId: 1,
    },
    {
      tokenId: 2,
    },
    {
      tokenId: 3,
    },
  ]
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  const { rewardStatus } = useRefReward()
  const { metadataList } = useFetchMetadata(tokenList)

  const findAssetsByType = useCallback(
    (name: string): Array<MetadataWithStatus> => {
      const metadataWithStatus = metadataList.map((data, i) => {
        return {
          ...data,
          rewardStatus: rewardStatus[i],
          tokenId: tokenList[i].tokenId,
          claimId: i,
        }
      })

      const pendingRewards = metadataWithStatus.filter(
        (item) => item.rewardStatus === true,
      )
      const receivedRewards = metadataWithStatus.filter(
        (item) => item.rewardStatus === false,
      )
      const list = name === 'pending' ? pendingRewards : receivedRewards
      console.log('MyNFTPage::findAssetsByType metadataWithStatus:', metadataWithStatus, 'list:', list)
      return list
    },
    [metadataList, rewardStatus, tokenList],
  )

  const [selectedList, setSelectedList] = useState<Array<MetadataWithStatus>>(
    [],
  )

  const handleSwitcherChange = useCallback(
    (name: string) => {
      const list = findAssetsByType(name)
      setSelectedList(list)
    },
    [findAssetsByType],
  )

  useEffect(() => {
    if (account) {
      const initList = findAssetsByType('pending')
      setSelectedList(initList)
    }
  }, [account, findAssetsByType])

  return (
    <StyledPageWrapper>
      <Page showBgColor={false}>
        {account ? (
          <StyledContainer>
            <Switcher
              switcherList={switcherList}
              onChange={handleSwitcherChange}
            />
            <VESTCards selectedList={selectedList} />
          </StyledContainer>
        ) : (
          <StyledUnlockWrapper>
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </StyledUnlockWrapper>
        )}
      </Page>
    </StyledPageWrapper>
  )
}

const StyledPageWrapper = styled.div`
  background-color: rgba(8, 8, 8, 0.4);
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

const StyledUnlockWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

export default MyNFTPage
