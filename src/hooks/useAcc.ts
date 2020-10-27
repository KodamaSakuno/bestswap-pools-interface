import { useCallback, useMemo, useState, useEffect } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getContract } from "../utils/acc"
import { ACC } from '../constants/acc'

export default () => {
    const { account, ethereum } = useWallet()

    const [staked, setStaked] = useState(0)

    const contract = useMemo(() => {
        return getContract(ethereum as provider, ACC)
    }, [ethereum])


    const handleUnstake = useCallback(
        async () => {
          const call = contract.methods.withdraw().send({ from: account })
          const txHash = call.on('transactionHash', (tx: any) => {
            console.log(tx)
            return tx.transactionHash
          })
          console.log(txHash)
          return txHash
        },
    [account, contract])

    const handleStake = useCallback(
        async (tokenId: number) => {
          const call = contract.methods.stake(tokenId).send({ from: account })
          const txHash = call.on('transactionHash', (tx: any) => {
            console.log(tx)
            return tx.transactionHash
          })
          console.log(txHash)
          return txHash
        },
    [account, contract])

    const fetchStaked = useCallback(async () => {
        const staked = await contract.methods.getStaked(account).call();
        if (staked === '0') {
            setStaked(0)
            return
        }
        setStaked(Number(staked))
      }, [account, contract.methods])
    
    useEffect(() => {
        if (account && contract) {
            fetchStaked()
        }
    }, [account, contract, fetchStaked])

    return { onUnstake: handleUnstake, onStake: handleStake, staked }
}
