import { useCallback, useMemo } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContract } from '../utils/nfts'
import useNFT from './useNFT'

const useApproveNFT = (symbol: string, to: string) => {
  const { account, ethereum } = useWallet()
  const nft = useNFT(symbol)

  const contract = useMemo(() => {
    return getContract(ethereum as provider, nft.address)
  }, [ethereum, nft.address])

  const handleApprove = useCallback(async (tokenId: string) => {
    try {
      return await contract.methods.approve(to, tokenId)
        .send({ from: account })
    } catch (e) {
      console.error(e)
      return false
    }
  }, [account, contract, to])

  return { onApprove: handleApprove }
}

export default useApproveNFT
