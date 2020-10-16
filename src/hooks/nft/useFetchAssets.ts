import { useState, useEffect } from 'react'
import useOpenSea from './useOpenSea'
import { /* VestNFTAddress, */ VestNFTList } from '../../constants/vestNFTs'
// import { AxiosResponse } from 'axios'

export interface NftAssetsContract {
  address: string
  name: string
  symbol: string
}

export interface NftAssetsTraits {
  trait_type: string
  value: string | number | null
  display_type: string | null
  max_value: string | number | null
  trait_count: number
  order: number | null
}

export interface NftAssets {
  id: number
  token_id: number
  background_color: string | null
  image_url: string | null
  image_preview_url: string | null
  image_thumbnail_url: string | null
  image_original_url: string | null
  name: string
  description: string
  asset_contract: NftAssetsContract
  decimals: number | null
  traits: Array<NftAssetsTraits>
}

interface NftAssetsPromise {
  assets: Array<NftAssets>
}

const useFetchAssets = () => {
  const [assets, setAssets] = useState<Array<NftAssets>>([])
  const [assetsTypeList, setAssetsTypeList] = useState<Array<string>>([])

  const request = useOpenSea()

  useEffect(() => {
    const fetchData = async () => {
      // const response: AxiosResponse<NftAssetsPromise> = await request({
      //   url: 'assets/',
      //   method: 'GET',
      //   params: {
      //     asset_contract_address: VestNFTAddress,
      //     order_direction: 'asc',
      //     offset: 0,
      //     limit: 50,
      //   },
      // })
      const staticData: NftAssetsPromise = {
        assets: VestNFTList
      }

      const data = staticData

      if (data.assets) {
        setAssets(data.assets)

        const typeList = new Set<string>()
        data.assets.forEach((item) => {
          item.traits.forEach((trait) => {
            if (trait.trait_type === 'Type') {
              typeList.add(trait.value.toString())
            }
          })
        })

        setAssetsTypeList(Array.from(typeList))
      }
    }

    fetchData()
  }, [request])

  return { assets, assetsTypeList }
}

export default useFetchAssets
