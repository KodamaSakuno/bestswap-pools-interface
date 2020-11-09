import { useCallback } from 'react'
import web3 from '../web3'
import RefReward from '../constants/abi/RefReward.json'

import { useWallet } from 'use-wallet'

const useClaim = () => {
  const { account } = useWallet()
  const refRewardAddress = '0x00d91F661B87377C0F2F164e41e910175E6359cC'

  const contract = new web3.eth.Contract(RefReward as any, refRewardAddress)

  const handleClaim = useCallback(
    async () => {
      const call = await contract.methods.claim().send({ from: account })
      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
      window.location.reload()
    },
    [account, contract],
  )

  return { onClaim: handleClaim, refRewardContract: contract }
}

export default useClaim
