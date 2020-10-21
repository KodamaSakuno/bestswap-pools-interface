import { useCallback } from 'react'
import web3 from '../web3'
import RefReward from '../constants/abi/RefReward.json'

import { useWallet } from 'use-wallet'

const useClaim = () => {
  const { account } = useWallet()
  const refRewardAddress = '0x62d24e413B24098BB8d2C19b64BCEf7aa981C755'

  const contract = new web3.eth.Contract(RefReward as any, refRewardAddress)

  const handleClaim = useCallback(
    async () => {
      const call = contract.methods.claim().send({ from: account })
      const txHash = call.on('transactionHash', (tx: any) => {
        console.log(tx)
        return tx.transactionHash
      })
      console.log(txHash)
    },
    [account, contract],
  )

  return { onClaim: handleClaim, refRewardContract: contract }
}

export default useClaim
