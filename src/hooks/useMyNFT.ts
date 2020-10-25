// import BigNumber from "bignumber.js"
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { getContract } from '../utils/vest'
import { ACC } from '../constants/acc'
import { NFTLength } from '../constants/vestNFTs'

const useNFTBalance = () => {
  const initBalance = new Array(NFTLength).fill(0); // [0, 0, 0,...,0]
  const [NFTBalance, setNFTBalance] = useState(initBalance)
  const [approveState, setApproveState] = useState(false)
  const { account, ethereum } = useWallet()

  const contract = useMemo(() => {
    return getContract(
      ethereum as provider,
      '0x9c07A44E2dC4A80d4B4d60e45Dfd5FaA29D283A8',
    )
  }, [ethereum])

  const fetchNFTBalance = useCallback(async () => {
    const initAccount = new Array(NFTLength).fill(account); // [account, account, ... account]
    const initTokenId = Array.from({length:NFTLength},(item, index)=> index+1) // [1,2,3,...18]
    const balance = await contract.methods
      .balanceOfBatch(initAccount, initTokenId)
      .call()
    console.log('useNFTBalance::fetchNFTBalance balance:', balance)
    setNFTBalance(balance)
  }, [account, contract.methods])


  const fetchApproveState = useCallback( async () => {
    const approveState = await contract.methods.isApprovedForAll(account, ACC).call()
    console.log('useNFTBalance::fetchApproveState approveState:', approveState)
    setApproveState(approveState)
  },
  [contract.methods, account],
)

  useEffect(() => {
    if (account && contract) {
      fetchNFTBalance()
      fetchApproveState()
    }
  }, [account, contract, fetchNFTBalance, fetchApproveState])

  const nftUri = useCallback(
    async (tokenId: number) => {
      const uri = await contract.methods.uri(tokenId).call()
      console.log('useNFTBalance::nftUri uri:', uri)
      return uri
    },
    [contract.methods],
  )

  const setApprovalForAll = useCallback( async () => {
      await contract.methods.setApprovalForAll(ACC, true).send({ from: account })

      /* const txHash = await call.on('transactionHash', (tx: any) => {
        console.log('NFT::useClaim::setApprovalForAll tx:', tx)
        return tx.transactionHash
      })

      console.log('NFT::useClaim::setApprovalForAll txHash:', txHash) */
    },
    [contract.methods, account],
  )

  console.log('useNFTBalance NFTBalance:', NFTBalance)

  return { NFTBalance, nftUri, setApprovalForAll, approveState }
}

export default useNFTBalance
