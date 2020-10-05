import React from 'react'
import { useWallet } from 'use-wallet'
import { Context } from '../NFTs'

import { NFTs as supportedNFTs } from '../../constants/nft'
import { NFT } from './types'

const NFTs: React.FC = ({ children }) => {
    const { chainId } = useWallet()

    const nfts: Array<NFT> = supportedNFTs.filter(nft => (nft.addresses as any)[chainId]).map(
        ({ addresses, name, symbol }: any) => ({
            address: addresses[chainId],
            name,
            symbol,
        })
    )

    return (
        <Context.Provider
            value={{nfts}}
        >
            {children}
        </Context.Provider>
    )
}

export default NFTs
