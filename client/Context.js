import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [registedPeople, setRegisteredPeople] = useState([]);
    const [loginPerson, setLoginPerson] = useState([]);
    useEffect(() => {
        // fetch("/api/signup")
        //     .then((res) => {
        //         if (!res.ok) {
        //             throw new Error(res.statusText);
        //         }
        //         return res.json();
        //     })
        //     .then((body) => {
        //         setRegisteredPeople(body);
        //     })
        //     .catch((err) => {
        //         console.error(err);
        //     });

            // fetch("/api/signin")
            // .then((res) => {
            //     if (!res.ok) {
            //         throw new Error(res.statusText);
            //     }
            //     return res.json();
            // })
            // .then((body) => {
            //     setLoginPerson(body);
            // })
            // .catch((err) => {
            //     console.error(err);
            // });
    }, []);

    return (
        <AppContext.Provider value={
            {
                registedPeople,
                loginPerson,
                setRegisteredPeople,
                setLoginPerson,
            }
        }>
            {children}
        </AppContext.Provider>
    );
};

export const useGlobalContext = () => {
    return useContext(AppContext);
};

export { AppContext, AppProvider };