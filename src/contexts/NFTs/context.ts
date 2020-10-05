import { createContext } from "react";
import { NFTsContext } from "./types";

const context = createContext<NFTsContext>({
    nfts: [],
})

export default context
