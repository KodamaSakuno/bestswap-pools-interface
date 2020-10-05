export interface Accelerator {
    symbol: string,
    address: string,
    poolAddress: string,
}

export interface AcceleratorsContext {
    accelerators: Accelerator[]
}
