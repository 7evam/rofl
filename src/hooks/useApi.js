import React, { useState } from "react";
import {useSelector} from 'react-redux'
import axios from 'axios'
import { toast } from "react-toastify";

// this is a hook that exports a function that can eventually 
// be configured to call any api with any data or any headers
// while giving a real time update on loading status

export default function useApi() {
   const [isLoading, setIsLoading] = useState(false);

   const {userToken} = useSelector(state => ({
        ...state.authReducer
    }));

   const roflApi = axios.create({
        baseURL: process.env.ROFL_API_BASE_URL,
    });
    
    if(userToken){
        roflApi.defaults.headers.common['userToken'] = userToken
    }

    const makeRequest = async ({method, route, data = null, continueLoading = false, suppressIsLoading = false}) => {
        if(!suppressIsLoading) setIsLoading(true)
        try {
            return roflApi[method](route, data)
                .then(res => {
                    console.log("HERE is a truly raw res")
                    console.log(res)
                    if(res.data?.statusCode){
                        return res.data 
                    } else {
                        return {
                            statusCode: res.status,
                            body: res.data
                        }
                    }
                })
                .catch((e) => {
                    /**
                     * @TODO add logout on 401
                     */ 
                    // console.log(e.response?.data)
                    const errorMessage = e.response?.data?.message ? e.response.data.message : e.response?.data ? e.response.data : 'Your request could not be completed'
                    toast.error(errorMessage)
                    throw e;
                })
                .finally(() => {
                    if(!continueLoading){
                        setIsLoading(false);
                    }
                });
        } catch(err) { 
            console.log('here is error')
            console.log(err)
            return err
        }
    }

    const stopLoading = () => {
        setIsLoading(false)
    }

   return { makeRequest, isLoading, stopLoading };
}