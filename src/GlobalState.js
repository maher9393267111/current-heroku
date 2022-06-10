import React, {createContext, useState, useEffect} from 'react'

import axios from 'axios'
import { API_URL } from './api/apiurl'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    const [token, setToken] = useState('')

    const [user, setUser] = useState(false)

const axiosurl = axios.create({
    baseURL:`/user/refresh_token`,
    // `${API_URL}/user/refresh_token`,
   headers: { 'content-type': 'application/json' },
    withCredentials: true
})
    

const firstLogin =  localStorage.getItem('firstLogin') ? localStorage.getItem('firstLogin') : false 
    
    useEffect(() =>{
        // const firstLogin = localStorage.getItem('firstLogin')
        // console.log('first login ---->',firstLogin)
        // if(firstLogin){
        //     console.log('first login work')
        //     const refreshToken = async () =>{
        //         const res = await axios.get(`/user/refresh_token`)
        // console.log('resssssssssssss' ,res.data.accesstoken)
        //         setToken(res.data.accesstoken)
        //         console.log(token ,'-----------------token refresh data')
    
        //         setTimeout(() => {
        //             refreshToken()
        //         }, 10 * 60 * 1000)
        //     }
        //     refreshToken()
        // }


if(localStorage.getItem('token')){


    setToken(localStorage.getItem('token'))
}

    },[])








    const state = {
        token: [token, setToken],
       productsAPI: ProductsAPI(),
       userAPI: UserAPI(token),
       categoriesAPI: CategoriesAPI()
    }



    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}