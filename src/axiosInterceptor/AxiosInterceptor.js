import axios from "axios"

const axiosClient = axios.create({baseURL:'http://localhost:4000'})

export const request = ({...options})=>{
    axiosClient.defaults.headers.common.Authorization = 'Bearer Token'
    const onSuccess = (response)=>{
        console.log("success",{response})
        return response
    }
    const onError = (error)=>{
        console.log("error",{error})
        return error
    }  
    return axiosClient(options).then(onSuccess).catch(onError)
}