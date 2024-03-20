import {useMutation} from 'react-query'
import { signup } from 'service/signup'

export const useUserSignUp = ()=>{
    return useMutation(
        signup,
        
    )
}