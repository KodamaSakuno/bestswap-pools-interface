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
    const uri1 = await contract.methods.uri(1).call()
    const uri2 = await contract.methods.uri(2).call()
    const uri3 = await contract.methods.uri(3).call()
    console.log(
      'useNFTBalance::fetchNFTBalance uri1:',
      uri1,
      'uri2:',
      uri2,
      'uri3:',
      uri3,
    )
    console.log('useNFTBalance::fetchNFTBalance balance:', balance)
    setNFTBalance(balance)
  }, [account, contract])

  useEffect(() => {
    if (account && contract) {
      fetchNFTBalance()
    }
  }, [account, fetchNFTBalance, contract, setNFTBalance])

  const nftUri = useCallback(
    async (tokenId) => {
      const uri = await contract.methods.uri(tokenId).call()
      console.log('useNFTBalance::nftUri uri:', uri)
      return uri
    },
    [contract],
  )

  console.log('useNFTBalance NFTBalance:', NFTBalance)

  return [NFTBalance, nftUri] as const
}

export default useNFTBalance
