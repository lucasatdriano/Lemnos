/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
    const [isNavigatingToPayment, setIsNavigatingToPayment] = useState(false);
    const [isNavigatingToBuy, setIsNavigatingToBuy] = useState(false);

    const navigationState = {
        isNavigatingToPayment,
        setIsNavigatingToPayment,
        isNavigatingToBuy,
        setIsNavigatingToBuy,
    };

    return (
        <NavigationContext.Provider value={navigationState}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
