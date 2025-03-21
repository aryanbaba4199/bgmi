import { Children, createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useApp = ()=> useContext(AppContext);

const AppProvider = ({children})=>{
    const [user, setUser] = useState(null);
    return (
        <AppContext.Provider 
        value = {{
            user, setUser
        }}>{children}</AppContext.Provider>
    )
}



export default AppProvider;