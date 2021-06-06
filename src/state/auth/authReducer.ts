import { authActionType, authRedActions, AuthState } from "./authTypes";



const initialAuthState = new AuthState();
export const authReducer = (state:AuthState = initialAuthState,action : authActionType) =>{
    switch(action.type){
        case authRedActions.login:
            return {...action.payload, status: authRedActions.login}
        case authRedActions.logout:
            return {status:authRedActions.logout}
        default:
            return {state}
    }
        
    
}