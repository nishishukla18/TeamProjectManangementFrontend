import { createContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";

export const AppContext = createContext();

axios.defaults.withCredentials = true;
export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState("");

  const getAuthStatus=async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/auth/is-auth')
      if(data.success){
        setIsLoggedin(true)
        getUserData()
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  const getUserData = async()=>{
    try {
      const {data} = await axios.get(backendUrl+'/api/user/data')
      if(data.success){
        setUserData(data.userData)
      }else{
        toast.error(data.message)
      }
    }
    catch (error) {
    toast.error(error.response?.data?.message || error.message);
}

   }
 useEffect(()=>{
  getAuthStatus()
 },[])
  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,

  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
