import { useCallback, useEffect, useState } from 'react'
import { useWallet } from 'use-wallet'
import axios, { AxiosResponse } from 'axios'
import useMyNFT from '../useMyNFT'

export interface VestAttributes {
  trait_type: string
  value: string | number
}

export interface VestMetadata {
  external_url: string
  image: string
  name: string
  description: string
  attributes: Array<VestAttributes>
}

export interface TokenItem {
  tokenId: number
}

const useFetchMetadata = (tokenList: Array<TokenItem>) => {
  const { account } = useWallet()
  const [metadataList, setMetadataList] = useState<Array<VestMetadata>>([])
  const [, nftUri] = useMyNFT()
  const fetchMetadataList = useCallback(async () => {
    const responseList = await Promise.all(
      tokenList.map(async (token) => {
        const uri = await nftUri(token.tokenId)
        return axios.get(uri) as Promise<AxiosResponse<VestMetadata>>
      }),
    )
    const list = responseList.map((res) => res.data)
    console.log('MyNFTPage::useEffect:fetchData metadataList:', list)

    setMetadataList(list)
  }, [nftUri, tokenList])

  useEffect(() => {
    if (account) {
      fetchMetadataList()
    }
  }, [account, fetchMetadataList])

  return { metadataList }
}

export default useFetchMetadata
