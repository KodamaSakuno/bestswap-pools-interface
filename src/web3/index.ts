import Web3 from 'web3'

const web3 = new Web3(
    Web3.givenProvider ||
    new Web3.providers.HttpProvider(
        'https://data-seed-prebsc-1-s1.binance.org:8545'
    )
)

export const ethEnabled = async () => {
    // @ts-ignore
    if (window.ethereum) {
        // @ts-ignore
        await window.ethereum.enable()
        return true
    }
    return false
}

export default web3