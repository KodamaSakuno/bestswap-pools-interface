import Web3 from 'web3'

const web3 = new Web3(
    Web3.givenProvider ||
    new Web3.providers.HttpProvider(
        'https://bsc-dataseed.binance.org/'
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