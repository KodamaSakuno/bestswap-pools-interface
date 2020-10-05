import Web3 from 'web3'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { provider } from 'web3-core'
// import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import NFTABI from '../constants/abi/NFT.json'
import NFTHoldingEnumeratorABI from '../constants/abi/NFTHoldingEnumerator.json'
import PoolAcceleratorABI from '../constants/abi/PoolAccelerator.json'

export const getContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (NFTABI as unknown) as AbiItem,
    address,
  )
  return contract
}

export const getHoldingEnumeratorContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (NFTHoldingEnumeratorABI as unknown) as AbiItem,
    address,
  )
  return contract
}

export const getAcceleratorContract = (provider: provider, address: string) => {
  const web3 = new Web3(provider)
  const contract = new web3.eth.Contract(
    (PoolAcceleratorABI as unknown) as AbiItem,
    address,
  )
  return contract
}
