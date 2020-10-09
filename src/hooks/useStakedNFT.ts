import { useCallback, useEffect, useMemo, useState } from "react"
import { useWallet } from "use-wallet"
import { provider } from 'web3-core'
import { getAcceleratorContract, getContract } from "../utils/nfts"
import useAccelerator from "./useAccelerator"
import useNFT from "./useNFT"

export default (symbol: string) => {
    const { account, ethereum } = useWallet()

    const accelerator = useAccelerator(symbol)
    const accContract = useMemo(() => {
        return getAcceleratorContract(ethereum as provider, accelerator.address)
    }, [ethereum, accelerator])

    const nft = useNFT(symbol)
    const contract = useMemo(() => {
        return getContract(ethereum as provider, nft.address)
    }, [ethereum, nft])

    const [staked, setStaked] = useState('')
    const [quality, setQuality] = useState('')

    const fetch = useCallback(async () => {
        const staked = await accContract.methods.getStaked(account).call();
        if (staked === '0') {
            setStaked('')
            setQuality('')
            return
        }

        const quality = await contract.methods.qualityOf(staked).call();
        setStaked(staked)
        setQuality(quality)
      }, [account, accContract, contract])

      useEffect(() => {
        if (account && accContract) {
            fetch()
        }
        let refreshInterval = setInterval(fetch, 10000)
        return () => clearInterval(refreshInterval)
      }, [account, symbol, setStaked, accContract, fetch])

    return [staked, quality, fetch] as const
}
