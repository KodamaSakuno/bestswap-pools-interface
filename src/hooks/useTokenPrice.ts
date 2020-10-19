import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { utils } from "ethers";
import { useWallet } from "use-wallet";
import { getSwapRouter } from "../utils/swapRouter";
import { address } from "../constants/swap";
import { WBNB } from "../constants/addresses";
// import { BigNumber } from "../sushi";

// const { BigNumber } = utils

/**
 * useTokenPrice 获取1个单位的代币在 Swap 合约中的价格（以BNB计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPrice(tokenAddress: string, decimals: number|string = 18) {
    const { account, ethereum } = useWallet()
    const [ priceInBNB, updatePriceInBNB ] = useState("0")
    // 97 stands for bsc testnet
    const networkId = 97
    const contract = useMemo(() => {
        return getSwapRouter(ethereum as provider, address[networkId])
    }, [ethereum])

    const fetchPrice = useCallback(async () => {
        const [, outputWBNB] = await contract.methods.getAmountsOut(
            utils.parseUnits("1", decimals), 
            [
                tokenAddress, // the token address
                WBNB[networkId] // WBNB
            ]).call();
        updatePriceInBNB(outputWBNB)
    }, [contract, tokenAddress, decimals])


    useEffect(() => {
        if (account && contract) {
            fetchPrice()
        }
    }, [contract, account, fetchPrice])

    return { priceInBNB, fetchPrice }
}
