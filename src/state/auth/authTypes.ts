export enum authRedActions{
    login = "login",
    logout = "logout"
}

export interface authPayload{
    auth: string,
    username:string,
    first_name: string,
    last_name: string,
    role: string
}

export class AuthState implements authPayload{
    auth:string;
    username: string
    first_name: string
    last_name: string
    role: string
    status: string

    constructor(){
        this.auth = "";
        this.username = "";
        this.first_name = "";
        this.last_name = "";
        this.role = "";
        this.status = "";
    }
}


interface loginActionType{
    type : authRedActions.login;
    payload: authPayload,
}
interface logoutActionType{
    type : authRedActions.logout
}

export type authActionType =  loginActionType | logoutActionType