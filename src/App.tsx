import { ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import React, { createContext, FC, useEffect, useState } from "react";
import { darkTheme, lightTheme } from "./config/theme";
import { User } from "./interfaces/user";
import Main from "./screens/Main";
import { getSession } from "./api/login.api";

export const UserContext = createContext<User | null>(null);

const App: FC = () => {
    const [darkMode, setDarkMode] = useState<boolean>(useMediaQuery("(prefers-color-scheme: dark)") || true);
    const [userData, setUserData] = useState<User | null>(null);

    const toggleDarkMode = (value: boolean) => {
        setDarkMode(value);
    };

    const handleUpdateUserData = (data?: User) => {
        setUserData(data || null);
    };

    const handleGetSession = async () => {
        await getSession()
            .then((response) => response.json())
            .then((response) => {
                if (response._id) setUserData(response as User);
            });
    };

    useEffect(() => {
        handleGetSession();
    }, []);

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <UserContext.Provider value={userData}>
                <Main darkMode={darkMode} toggleDarkMode={toggleDarkMode} handleUpdateUserData={handleUpdateUserData} />
            </UserContext.Provider>
        </ThemeProvider>
    );
};

export default App;
