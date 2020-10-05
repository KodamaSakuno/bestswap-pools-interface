import { useContext } from 'react'
import { Context as NFTsContext } from '../contexts/NFTs'

const useNFTs = () => {
    const { nfts } = useContext(NFTsContext)
    return [nfts]
}

export default useNFTs
