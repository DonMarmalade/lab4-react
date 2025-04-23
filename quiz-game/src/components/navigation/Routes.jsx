import {useRouterContext} from "@hooks/useRouterContext.js";
import {matchRoutes} from "@utils/path.js";
import {NotFoundPage} from "@pages/index.js";

export function Routes({children}) {
    const {location} = useRouterContext()

    const match = matchRoutes(children, location)

    if (!match) return <NotFoundPage />

    return <>{match}</>
}