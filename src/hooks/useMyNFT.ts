// import BigNumber from "bignumber.js"
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContract } from '../utils/vest'

const useNFTBalance = () => {
  const [NFTBalance, setNFTBalance] = useState([0, 0, 0])
  const { account, ethereum } = useWallet()

  const contract = useMemo(() => {
    return getContract(
      ethereum as provider,
      '0x1932E1dF49786a0fC4a8eFcf2641e0c6833DB402',
    )
  }, [ethereum])

  const fetchNFTBalance = useCallback(async () => {
    const balance = await contract.methods
      .balanceOfBatch([account, account, account], [1, 2, 3])
      .call()
    console.log('useNFTBalance::fetchNFTBalance balance:', balance)
    setNFTBalance(balance)
  }, [account, contract.methods])

  useEffect(() => {
    if (account && contract) {
      fetchNFTBalance()
    }
  }, [account, contract, fetchNFTBalance])

  const nftUri = useCallback(
    async (tokenId: number) => {
      const uri = await contract.methods.uri(tokenId).call()
      console.log('useNFTBalance::nftUri uri:', uri)
      return uri
    },
    [contract.methods],
  )

  console.log('useNFTBalance NFTBalance:', NFTBalance)

  return [NFTBalance, nftUri] as const
}

export default useNFTBalance
