// import react from 'react'
import axios from 'axios';
import React, { useCallback, useContext, useEffect, useReducer } from 'react'
import { useHistory } from 'react-router';
import { Row, Col,InputGroup,InputGroupAddon,InputGroupText,Input } from 'reactstrap';

import {useDispatch,useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { stateType } from '../state/store';
import { dispatchLogin } from '../state/auth/authDispatchers';
import { authPayload } from '../state/auth/authTypes';


class User{
    username:string;
    emailId:string;
    password:string;

    constructor(){
        this.username = "";
        this.emailId = "";
        this.password = "";
    }
}
// interface userDispatchType {
//     username : string;
//     emailId: string;

// }

enum userActions {
    setUsername = 'setUsername',
    setEmail = 'setEmail',
    setPass = 'setPass',
  }
type userActionsType = userActions.setEmail | userActions.setUsername | userActions.setPass;
type userActionPayloadType = {
    type: userActionsType;
    payload: string
}

const valueFromEvent= (event:React.ChangeEvent<HTMLInputElement>) =>{
    return event.target.value;
}
const  user = new User();
// const user:User = {
//     username:"",
//     emailId:"",
//     password:"",
// }

const userReducer : React.Reducer<User,userActionPayloadType> = (state,action) =>{
    //const state:User = Object.assign(oldState);
    //console.log(action,state);
    switch(action.type){
        case userActions.setUsername:
            state.username = action.payload;
            break;
        case userActions.setEmail:
            // return {...state,emailId:action.payload}
            state.emailId = action.payload;
            break;
        case userActions.setPass:
            state.password = action.payload;
            break;
        default:
            console.log("DEFAULT");
            break;
    }
    //console.log(state);   
    return {...state};
}


const login = async (user:User,gotToHome: { (user: authPayload): void; (arg0: authPayload): void; }) =>{
    try{
     const req = await axios.post('http://localhost:8000/shop/login',user,
     );
     console.log(req);
     var data:authPayload = req.data;
     if(data.auth == 'authorized'){
         alert('Login Successful');
        gotToHome(data);
     }else if(data.auth == 'blocked'){
         alert('Your Account Has Been Blocked');
     }
     else{
        alert('Login Unsuccessful');
     }
    } catch (error) {
        console.error(error);
        alert('Login Unsuccessful');
    }
}
    
export const AuthScreen = () => {
    const dispatch = useDispatch();
    const LoginDispatcher = bindActionCreators(dispatchLogin,dispatch);

    // const authState = useSelector((state:stateType) => state.auth);

    
    const [userState,userDispatch] = useReducer(userReducer,user);
    const history = useHistory();
    const userUpdater = (event:React.ChangeEvent<HTMLInputElement>,action:userActionsType) =>
        userDispatch({type:action,payload:valueFromEvent(event)});
    // const userUpdater = useCallback((event:React.ChangeEvent<HTMLInputElement>,action:userActionsType) => {
    //     // console.log(event.target.value,action,event);
    //         userDispatch({type: action, payload: event.target.value});
    //       }, [userDispatch]);
    
    // useEffect(() => {
    //     console.log(userState);
    // }, [userState]);

    const storeAndGoToHome = (user: authPayload) =>{
        LoginDispatcher(user);
        history.replace("/home");
    }

    return (
        <React.Fragment>
        <div className="w-100" style={{backgroundImage: "url('https://images3.alphacoders.com/621/621682.jpg')",height:'100vh',backgroundSize:'cover'}}>
            {/* <img  src={"https://images3.alphacoders.com/621/621682.jpg"}></img> */}
            <Row>
                <Col md="6 text-center justify-center" style={{paddingTop:'25vh',fontWeight:'bold'}}>
                    <h1 className="display-3">Online Shopping System</h1>
                </Col>
                {/* <p>{JSON.stringify(userState)}</p> */}
                <Col md="6" className='vh-100 bg-dark justify-center px-auto'>
                {/* <Container className="w-100 px-auto bg-info text-center p-5"> */}
                    <InputGroup className="w-50 mt-2">
                        <InputGroupAddon className='bg-white' addonType="prepend">
                        <InputGroupText className='bg-white'>Username</InputGroupText>
                        </InputGroupAddon>
                        <Input value={userState.username} onChange={(e) =>{userUpdater(e,userActions.setUsername)}} placeholder="username" />
                    </InputGroup>
                    <InputGroup className="w-50 mt-2">
                        <InputGroupAddon className='bg-white' addonType="prepend">
                        <InputGroupText className='bg-white'>Password</InputGroupText>
                        </InputGroupAddon>
                        <Input value={userState.password} type="password" onChange={(e) =>{userUpdater(e,userActions.setPass)}}  placeholder="password" />
                    </InputGroup>
                    <button onClick={()=>login(userState,storeAndGoToHome)} className="btn btn-warning text-dark mt-3" >Login</button>
                {/* </Container> */} 
                </Col>
            </Row>
        </div>
        </React.Fragment>

    )
}