// import BigNumber from "bignumber.js"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getContract } from '../utils/refReward'

const useRefReward = () => {
    const [rewardStatus, setRewardStatus] = useState([false, false, false])
    const { account, ethereum } = useWallet()

    const contract = useMemo(() => {
      return getContract(ethereum as provider, '0xe346173a7C151EEbAC3EF2E8811C94a41365a15C')
    }, [ethereum])

    const fetchRewardStatus = useCallback(async () => {
      const token1 = await contract.methods.canReward(account, 0).call()
      const token2 = await contract.methods.canReward(account, 1).call()
      const token3 = await contract.methods.canReward(account, 2).call()
      console.log('useRefReward::fetchRewardStatus token1:', token1, 'token2:', token2, 'token3:', token3)
      setRewardStatus([token1, token2, token3])
    }, [account, contract])

    useEffect(() => {
      if (account && contract) {
        fetchRewardStatus()
      }
    }, [account, fetchRewardStatus, contract, setRewardStatus])

    const handleClaimNFT = useCallback(
      async (id: number) => {
        try {
          const txHash: string = await contract.methods
          .claim(id)
          .send({ from: account })
          .on('transactionHash', (tx: { transactionHash: string }) => {
            console.log('useRefReward::handleClaimNFT tx:', tx)
            return tx.transactionHash
          })
          console.log('useRefReward::handleClaimNFT txHash:', txHash)
          return txHash
        } catch (error) {
          console.error('useRefReward::handleClaimNFT error:', error)
        }
      }, [account, contract.methods])

    return { rewardStatus, onClaimNFT: handleClaimNFT }
}

export default useRefReward
