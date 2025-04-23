import {createContext} from "react";

export const RouterContext = createContext(
    {
        location: "",
        push: () => {}
    }
)