import { useCallback, useMemo } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getAcceleratorContract } from "../utils/nfts"
import useAccelerator from "./useAccelerator"

export default (symbol: string) => {
    const { account, ethereum } = useWallet()
    const accelerator = useAccelerator(symbol)

    const contract = useMemo(() => {
        return getAcceleratorContract(ethereum as provider, accelerator.address)
    }, [account, ethereum])

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
    [account, contract, accelerator])

    return { onUnstake: handleUnstake }
}
