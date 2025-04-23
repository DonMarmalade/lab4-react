export function compilePath(path) {
    const escapedPath = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`^${escapedPath}$`, "i");
    return regex;
}

export function matchRoutes(children, location) {
    for (const route of children) {
        const regex = compilePath(route.props.path)
        if(regex.test(location)) {
            return route
        }
    }
    return null
}