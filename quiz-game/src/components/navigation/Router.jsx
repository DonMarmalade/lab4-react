import {RouterContext} from "@context/RouterContext.jsx";
import {useEffect, useState} from "react";

export function Router({children}) {
    const [location, setLocation] = useState(window.location.pathname)

    const handlePush = (newLocation) => {
        window.history.pushState({}, "", newLocation)
        setLocation(newLocation)
    }

    const handleChange = () => {
        setLocation(window.location.pathname)
    }

    useEffect(() => {
        window.addEventListener("popstate", handleChange)
        return () => window.removeEventListener("popstate", handleChange)
    }, []);

    const value = {location, push: handlePush}

    return (
        <RouterContext.Provider value={value}>
            {children}
        </RouterContext.Provider>
    )
}