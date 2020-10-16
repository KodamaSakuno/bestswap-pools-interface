import { useMemo } from 'react'
import axios from 'axios'

const useOpenSea = () => {
  const instance = useMemo(() => {
    const instance = axios.create({
      baseURL: 'https://rinkeby-api.opensea.io/api/v1/',
      headers: {}
    })
  
    return instance
  }, [])

  return instance
}

export default useOpenSea
