import {createContext, useContext, useState} from "react";

const StartContext = createContext()

export function StartProvider({ children }) {
    const [name, setName] = useState('');
    const [order, setOrder] = useState('random');
    const [timeLimit, setTimeLimit] = useState('30');

    const updateName = (name) => setName(name);
    const updateOrder = (order) => setOrder(order);
    const updateTimeLimit = (timeLimit) => setTimeLimit(timeLimit);

    return (
        <StartContext.Provider value={{name, order, timeLimit, updateName, updateOrder, updateTimeLimit}}>
            {children}
        </StartContext.Provider>
    )
}

export function useStartContext() {
    return useContext(StartContext);
}