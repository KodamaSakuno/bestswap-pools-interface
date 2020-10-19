import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { utils } from "ethers";
import { useWallet } from "use-wallet";
import { getSwapRouter } from "../utils/swapRouter";
import { address } from "../constants/swap";
import { WBNB } from "../constants/addresses";
// import { BigNumber } from "../sushi";

const { BigNumber } = utils

export function useTokenPrice(tokenAddress: string) {
    const { account, ethereum } = useWallet()
    const [ priceInBNB, updatePriceInBNB ] = useState(new BigNumber(0))
    // 97 stands for bsc testnet
    const networkId = 97
    const contract = useMemo(() => {
        return getSwapRouter(ethereum as provider, address[networkId])
    }, [ethereum])

    const fetchPrice = useCallback(async () => {
        const [, outputWETH] = await contract.methods.getAmountsOut(utils.parseUnits("1", 18), [
            tokenAddress, // the token address
            WBNB[networkId] // WETH
        ]).call();
        updatePriceInBNB(outputWETH)
      }, [contract, tokenAddress])

      useEffect(() => {
        if (account && contract) {
            fetchPrice()
        }
      }, [contract, account, fetchPrice])

      return { priceInBNB, fetchPrice }
}
