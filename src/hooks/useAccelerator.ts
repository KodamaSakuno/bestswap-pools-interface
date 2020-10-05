import { useContext } from "react"
import { Context as AcceleratorsContext } from '../contexts/Accelerators'

const useAccelerator = (symbol: string) => {
    const { accelerators } = useContext(AcceleratorsContext)
    const accelerator = accelerators.find((accelerator) => accelerator.symbol === symbol)
    return accelerator
}

export default useAccelerator