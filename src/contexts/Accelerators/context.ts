import { createContext } from "react";
import { AcceleratorsContext } from "./types";

const context = createContext<AcceleratorsContext>({
    accelerators: [],
})

export default context
