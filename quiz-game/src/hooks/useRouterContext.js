import {useContext} from "react";
import {RouterContext} from "@context/RouterContext.jsx";

export function useRouterContext() {
    return useContext(RouterContext)
}