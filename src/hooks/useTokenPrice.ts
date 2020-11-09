import { useCallback, useEffect, useMemo, useState } from "react";
import { provider } from 'web3-core'
import { utils } from "ethers";
import { useWallet } from "use-wallet";
import { getSwapRouter } from "../utils/swapRouter";
import { address } from "../constants/swap";
import { ADDRESS_ZERO, WBNB, BUSD } from "../constants/addresses";
import { getPairContract } from "../utils/pair";
import { BigNumber } from "../sushi";
// import { BigNumber } from "../sushi";

// const { BigNumber } = utils

/**
 * useTokenPriceInBNB 获取1个单位的代币在 Swap 合约中的价格（以BNB计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBNB(tokenAddress: string, decimals: number|string = 18, isLp = false) {
    const { account, ethereum } = useWallet()
    // use BigNumber, format them at the display part please
    const [ priceInBNB, updatePriceInBNB ] = useState("0")
    // 97 stands for bsc testnet
    const networkId = 56
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
        if (isLp) {
            // LP 做特殊处理
            const pairContract = getPairContract(ethereum as provider, tokenAddress);
                // rewardRate = reward for every second staking
            const { _reserve0, _reserve1 } = await pairContract.methods.getReserves().call();
            const _token0 = await pairContract.methods.token0().call();
            const totalSupply = await pairContract.methods.totalSupply().call();
            const _token1 = await pairContract.methods.token1().call();
            let token0Price = "0", token1Price = "0";
            try {
                [, token0Price] = await contract.methods.getAmountsOut(
                    utils.parseUnits("1", 18),
                    [
                            _token0, // the token address
                            WBNB[networkId] // WBNB
                        ]).call();
            } catch (error) {
                    token0Price = "0"
            }
            try {
                [, token1Price] = await contract.methods.getAmountsOut(
                        utils.parseUnits("1", 18),
                        [
                            _token1, // the token address
                            WBNB[networkId] // WBNB
                        ]).call();
            } catch (error) {
                    token1Price = "0"
            }
            console.log(`lp${tokenAddress} token0: ${token0Price},token1: ${token1Price}`)
            const token0Total = new BigNumber(token0Price).multipliedBy(2).multipliedBy(utils.formatUnits(_reserve0, 18)).div(totalSupply)
            const token1Ttotal = new BigNumber(token1Price).multipliedBy(2).multipliedBy(utils.formatUnits(_reserve1, 18)).div(totalSupply)
            let result: BigNumber;
            if (token0Price !== '0' && token1Price !== '0') {
                console.log('both exist for '+tokenAddress)
                const isToken0ExpensiveThan1 = new BigNumber(token0Price).lt(token1Price)
                result = isToken0ExpensiveThan1 ? token0Total : token1Ttotal
            } else if (token0Price !== '0') {
                console.log('token0 exist for '+tokenAddress)
                result = token0Total
            } else if (token1Price !== '0') {
                console.log('token1 exist for '+tokenAddress)
                result = token1Ttotal
            } else {
                result = new BigNumber(0)
            }
            const fresult = utils.parseUnits(result.toFixed(18), 18).toString()
            console.log(`result for ${tokenAddress} is ${fresult}`)
            updatePriceInBNB(fresult)
            return
        }
        try {
            const [, outputWBNB] = await contract.methods.getAmountsOut(
                oneUnitOfToken,
                [
                    tokenAddress, // the token address
                    WBNB[networkId] // WBNB
                ]).call();
            updatePriceInBNB(outputWBNB)
        } catch (error) {
            console.error('unable to fetch price for: ' + tokenAddress)
        }
    }, [contract, tokenAddress, isLp, oneUnitOfToken, ethereum])


    useEffect(() => {
        if (account && contract && decimals !== '0') {
            fetchPrice()
        }
    }, [contract, account, fetchPrice, decimals])

    return { priceInBNB, fetchPrice }
}



/**
 * useTokenPriceInBUSD 获取1个单位的代币在 Swap 合约中的价格（以BUSD计价）
 * @param tokenAddress Address of ERC20/BEP20 Token
 * @param decimals Token decimals, optional, default is 18. Needs to fill if decimals is not 18
 */
export function useTokenPriceInBUSD(tokenAddress: string, decimals: number|string = 18, isLp = false) {
    const { account, ethereum } = useWallet()
    // use BigNumber, format them at the display part please
    const [ priceInBUSD, updatePriceInBUSD ] = useState("0")
    // 97 stands for bsc testnet
    const networkId = 56
    const contract = useMemo(() => {
        return getSwapRouter(ethereum as provider, address[networkId])
    }, [ethereum])

    const oneUnitOfToken = utils.parseUnits("1", decimals)

    const fetchPrice = useCallback(async () => {
        if (tokenAddress.toLowerCase() === BUSD[networkId]) {
            // 1 BUSD = 1 BUSD 没毛病
            updatePriceInBUSD(oneUnitOfToken.toString())
            return
        }
        if (isLp) {
            // LP 做特殊处理
            const pairContract = getPairContract(ethereum as provider, tokenAddress);
                // rewardRate = reward for every second staking
            const { _reserve0, _reserve1 } = await pairContract.methods.getReserves().call();
            const _token0 = await pairContract.methods.token0().call();
            const totalSupply = await pairContract.methods.totalSupply().call();
            const _token1 = await pairContract.methods.token1().call();
            let token0Price = "0", token1Price = "0";
            try {
                [, token0Price] = await contract.methods.getAmountsOut(
                    utils.parseUnits("1", 18),
                    [
                            _token0, // the token address
                            WBNB[networkId] // WBNB
                        ]).call();
            } catch (error) {
                    token0Price = "0"
            }
            try {
                [, token1Price] = await contract.methods.getAmountsOut(
                        utils.parseUnits("1", 18),
                        [
                            _token1, // the token address
                            WBNB[networkId] // WBNB
                        ]).call();
            } catch (error) {
                    token1Price = "0"
            }
            console.log(`lp${tokenAddress} token0: ${token0Price},token1: ${token1Price}`)
            const token0Total = new BigNumber(token0Price).multipliedBy(2).multipliedBy(utils.formatUnits(_reserve0, 18)).div(totalSupply)
            const token1Ttotal = new BigNumber(token1Price).multipliedBy(2).multipliedBy(utils.formatUnits(_reserve1, 18)).div(totalSupply)
            let result: BigNumber;
            if (token0Price !== '0' && token1Price !== '0') {
                console.log('both exist for '+tokenAddress)
                const isToken0ExpensiveThan1 = new BigNumber(token0Price).lt(token1Price)
                result = isToken0ExpensiveThan1 ? token0Total : token1Ttotal
            } else if (token0Price !== '0') {
                console.log('token0 exist for '+tokenAddress)
                result = token0Total
            } else if (token1Price !== '0') {
                console.log('token1 exist for '+tokenAddress)
                result = token1Ttotal
            } else {
                result = new BigNumber(0)
            }
            const fresult = utils.parseUnits(result.toFixed(18), 18).toString()
            console.log(`result for ${tokenAddress} is ${fresult}`)
            updatePriceInBUSD(fresult)
            return
        }
        try {
            const [, outputBUSD] = await contract.methods.getAmountsOut(
                oneUnitOfToken,
                [
                    tokenAddress, // the token address
                    BUSD[networkId] // WBNB
                ]).call();
            updatePriceInBUSD(outputBUSD)
        } catch (error) {
            console.error('unable to fetch price for: ' + tokenAddress)
        }
    }, [contract, tokenAddress, isLp, oneUnitOfToken, ethereum])


    useEffect(() => {
        if (account && contract && decimals !== '0') {
            fetchPrice()
        }
    }, [contract, account, fetchPrice, decimals])

    return { priceInBUSD, fetchPrice }
}
