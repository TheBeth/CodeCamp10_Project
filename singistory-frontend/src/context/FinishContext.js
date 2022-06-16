import { createContext, useState } from "react";

const FinishContext = createContext()

function FinishContextProvider({ children }) {
    const [finish, setFinish] = useState('')
    return (
        <FinishContext.Provider value={{ finish, setFinish }} >
            {children}
        </FinishContext.Provider>
    )
}

export default FinishContextProvider

export { FinishContext }