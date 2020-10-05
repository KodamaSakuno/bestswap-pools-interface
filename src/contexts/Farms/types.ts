import { Contract } from 'web3-eth-contract'

export interface Farm {
  pid: number,
  name: string
  poolAddress: string,
  stakingToken: string
  stakingTokenAddress: string
  earnToken: string
  earnTokenAddress: string
  id: string
  tokenSymbol: string,
  isWBNB: boolean,
  icon: string,
  acceleratorAddress: string,
  nftSymbol: string,
}

export interface FarmsContext {
  farms: Farm[]
}
