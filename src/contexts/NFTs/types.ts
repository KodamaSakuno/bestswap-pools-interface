export interface NFT {
    name: string,
    symbol: string,
    address: string,
}

export interface NFTsContext {
    nfts: NFT[]
}
