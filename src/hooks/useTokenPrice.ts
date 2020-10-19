import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { utils } from "ethers";
import { useWallet } from "use-wallet";
import { getSwapRouter } from "../utils/swapRouter";
import { address } from "../constants/swap";
import { ADDRESS_ZERO, WBNB } from "../constants/addresses";
// import { BigNumber } from "../sushi";

// const { BigNumber } = utils

/**
 * useTokenPriceInBNB 获取1个单位的代币在 Swap 合约中的价格（以BNB计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBNB(tokenAddress: string, decimals: number|string = 18) {
    const { account, ethereum } = useWallet()
    // use BigNumber, format them at the display part please
    const [ priceInBNB, updatePriceInBNB ] = useState("0")
    // 97 stands for bsc testnet
    const networkId = 97
    const contract = useMemo(() => {
        return getSwapRouter(ethereum as provider, address[networkId])
    }, [ethereum])

    const oneUnitOfToken = utils.parseUnits("1", decimals)

    const fetchPrice = useCallback(async () => {
        if (tokenAddress === ADDRESS_ZERO) {
            // 零号地址，当 BNB 处理，1 BNB = 1 BNB 没毛病
            updatePriceInBNB(oneUnitOfToken.toString())
            return
        }
        const [, outputWBNB] = await contract.methods.getAmountsOut(
            oneUnitOfToken,
            [
                tokenAddress, // the token address
                WBNB[networkId] // WBNB
            ]).call();
        updatePriceInBNB(outputWBNB)
    }, [contract, tokenAddress, oneUnitOfToken])


    useEffect(() => {
        if (account && contract) {
            fetchPrice()
        }
    }, [contract, account, fetchPrice])

    return { priceInBNB, fetchPrice }
}
