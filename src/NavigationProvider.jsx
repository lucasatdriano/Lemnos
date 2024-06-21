/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isNavigatingToPayment, setIsNavigatingToPayment] = useState(false);

    return (
        <NavigationContext.Provider
            value={{ isNavigatingToPayment, setIsNavigatingToPayment }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
