/**
 * 
 * function to read the auth state
 * from redux store
 * 
 * @param redux state
 * @return Boolean
 */
 export const isAuthenticated = (state) => {
    return state?.auth?.authUser?.user != null;
}

/**
 * function to react the auth user attribute 
 * from redux store
 * 
 * @param state
 * @return UserObject
 */
export function getAuthUser(state) {
    return state?.auth?.authUser;
}

/**
 * function to react the auth user school 
 * from redux store
 * 
 * @param state
 * @return SchoolObject
 */
 export function getAuthUserSchool(state) {
    return state?.auth?.authUser?.school;
}


/**
 * function to react the auth user token 
 * from redux store
 * 
 * @param state
 * @return SchoolObject
 */
 export function getAuthToken(state) {
    return state?.auth?.authUser?.token;
}