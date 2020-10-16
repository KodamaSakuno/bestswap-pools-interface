// import BigNumber from "bignumber.js"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getContract } from '../utils/refReward'

const useRefReward = () => {
    const [rewardStatus, setRewardStatus] = useState([false, false, false])
    const { account, ethereum } = useWallet()

    const contract = useMemo(() => {
      return getContract(ethereum as provider, '0xd5F0b1227723E42feDD3EBF49d35816c5fD181dE')
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
      async (id) => {
        const txHash = await contract.methods
        .claim(id)
        .send({ from: account })
        .on('transactionHash', (tx: any) => {
          console.log(tx)
          return tx.transactionHash
        })
        console.log(txHash)
        return ''
      }, [account, contract.methods])

    return { rewardStatus, onClaimNFT: handleClaimNFT }
}

export default useRefReward
