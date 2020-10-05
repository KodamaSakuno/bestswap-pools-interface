import { useContext } from 'react'
import { Context as NFTsContext, NFT } from '../contexts/NFTs'

const useNFT = (symbol: string): NFT => {
  const { nfts } = useContext(NFTsContext)
  const nft = nfts.find((nft) => nft.symbol === symbol)
  return nft
}

export default useNFT
