import { authActionType, authPayload, authRedActions } from "./authTypes";
import {Dispatch} from 'redux';


export const dispatchLogin = (user : authPayload) =>{
    return (dispatch:Dispatch<authActionType>) => {
        dispatch({
            type: authRedActions.login,
            payload: user,
        });
    }
}

export const dispatchLogout = () =>{
    return (dispatch:Dispatch<authActionType>) => {
        dispatch({
            type: authRedActions.logout,
        }); 
    }
}