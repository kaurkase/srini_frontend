
import  { useEffect } from 'react';
import { useLocation } from "react-router-dom";

var helper = {};

helper.checkLogin = () => {
    if (JSON.parse(localStorage.getItem("authenticated")) === true) {
        return true;
    }
    return false;
};
helper.setLogin = (val) => {
    localStorage.setItem("authenticated", val);
};

helper.getCookie = (cookieName) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${cookieName}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
const useLocationEffect = (callback) => {
    const location = useLocation();
  
    useEffect(() => {
      callback(location);
    }, [location]);
  }
export default helper;
export {useLocationEffect};