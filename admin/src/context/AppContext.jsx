import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currency = '$';

    const calculateAge = (dob) => {
        const today = new Date();
        const birthDay = new Date(dob);

        let age = today.getFullYear() - birthDay.getFullYear();

        return age;
    }


    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + "th " + months[+dateArray[1]] + ", " + dateArray[2];
    }

    const value = {
        calculateAge,
        slotDateFormat,
        currency,

    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;