import React from "react";

const useLocalStorage = {

    setItemInLocalStorage : ( key, value ) => {
        try {
            if (typeof window !== 'undefined')
                localStorage.setItem(JSON.stringify(key) , JSON.stringify(value));
        }
        catch(err){
            console.log("set item error : ",err);
        }
    },

    getItemFromLocalStorage : (key) => {
        try{ 
            if (typeof window !== 'undefined')
                return window.localStorage.getItem(JSON.stringify(key));
        }
        catch(err){
            console.log("get item error : ",err);
        }
    },

    removeItemFromLocalStorage : (item) => {
        try {
            if (typeof window !== 'undefined')
                localStorage.removeItem(item);
        }
        catch(err){
            console.log("remove item error : ",err);
        }
    },

    clearLocalStorage : () => {
        try {
            if (typeof window !== 'undefined')
                localStorage.clear();
        }
        catch(err){
            console.log("clear error : ",err);
        }
    }
}

export default useLocalStorage;