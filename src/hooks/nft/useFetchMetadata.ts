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
  const [tokens] = useState<Array<TokenItem>>(tokenList)
  const [metadataList, setMetadataList] = useState<Array<VestMetadata>>([])
  const [, nftUri] = useMyNFT()
  const fetchMetadataList = useCallback(async () => {
    const responseList = await Promise.all(
      tokens.map(async (token) => {
        const uri = await nftUri(token.tokenId)
        // const uri = `https://metadataapi.daojam.io/vest/${token.tokenId}`
        return axios.get(uri) as Promise<AxiosResponse<VestMetadata>>
      }),
    )
    const list = responseList.map((res) => res.data)
    console.log('useFetchMetadata::fetchMetadataList responseList:', responseList, 'list:', list)

    setMetadataList(list)
  }, [nftUri, tokens])

  useEffect(() => {
    if (account) {
      fetchMetadataList()
      console.log('useFetchMetadata::useEffect called!')
    }
  }, [account, fetchMetadataList])

  return { metadataList }
}

export default useFetchMetadata
