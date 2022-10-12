import moment from 'moment';

/**
 * utility functions
 * 
 */
 

/**
 * 
 * function that checks if every key in an object is falsy js values e.g '', 0, null, false, undefined e.t.c
 * if all keys are false it return true
 * else it return  false
 * 
 * this function is primarily used for form validation
 * to ensure all checks are passed
 * 
 * @args object -  a js object with keys
 * @return boolean - a boolean indicating true or false
 * 
 */
 export function checkObject(obj){
    return Object.keys(obj).every((key) => !obj[key])
}

/**
 * 
 * function checks if a value is falsy, 
 * then return false, if not it returns true
 * 
 * this function is primarily used for the error 
 * prop in react material u.i text field component
 * the prop expects a boolean value
 * 
 *  * @param value 
    * @returns boolean
 */
export function isError(value){
    return !((value == "") || (value == null) || (value == undefined));
}

export function convertDateStringtoLocalDateString(dateString){
    return moment.utc(dateString).format('MMMM Do YYYY, h:mm:ss a');
}

export function convertDateStringToDateQueryFormat(dateObject){
    try{
        const offset = dateObject.getTimezoneOffset();
        let yourDate = new Date(dateObject.getTime() - (offset*60*1000));
        return yourDate.toISOString().split('T')[0];
    }catch(Exception){
        return null;
    }
}

export const injectArguments = (url, dict_of_args) => {
    let url_array = url.split("/");
    Object.keys(dict_of_args).map((key, index)=>{
        let param = ":"+key;
        let index_found = url_array.indexOf(param);
        if (index_found != -1){
            // replace that param with the value we have 
            // this mutates my array, in react importance is placed on immutablillty
            url_array[index_found] = dict_of_args[key];
        }
        return "";
    })
    // join the array back and return the resulting url
    let url_string = url_array.join("/");
    return url_string;
  }


export const initializeUrlWithFilters = (url, filters) => {


    Object.entries(filters).map(([key, value]) => {
        
        url += `&${key}=${value}`;
    })

    return url;

}