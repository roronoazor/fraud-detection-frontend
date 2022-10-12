import toast from 'react-hot-toast';

/**
 * 
 * function to handle api errors
 * 
 * this function has side effects
 * 
 * @args error - the error response from the api
 * @return null
 * 
 */
export function handleApiError(error){
    
    let message = error?.response?.data?.detail ? error?.response?.data?.detail : error.toString();
    toast.error(message)
    return
}

/**
 * 
 * function to handle api success
 * 
 * this function has side effects
 * 
 * @args response - success response from the api
 * @return null
 * 
 */
 export function handleApiSuccess(response){
    
    let message = response?.message || "Success";
    toast.error(message)
    return
}