import { useCallback, useEffect, useMemo, useState } from 'react'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { HoldingEnumerators } from '../constants/nft'
import { getHoldingEnumeratorContract } from '../utils/nfts'

const useHoldings = (address: string) => {
  const { account, ethereum, chainId } = useWallet()
  const contract = useMemo(() => {
    return getHoldingEnumeratorContract(ethereum as provider, (HoldingEnumerators as any)[chainId])
  }, [ethereum, chainId])

  const [holdings, setHoldings] = useState([])

  const fetch = useCallback(async () => {
    const holdings = await contract.methods.getHoldingsOf(address, account).call()
    setHoldings(holdings)
  }, [account, contract, address])

  useEffect(() => {
    if (account && contract) {
      fetch()
    }
  }, [account, contract, fetch])

  return [holdings, fetch] as const
}

export default useHoldings
