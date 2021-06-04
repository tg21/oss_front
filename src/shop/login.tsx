// import react from 'react'
import axios from 'axios';
import React, { useCallback, useEffect, useReducer } from 'react'
import { Row, Col,InputGroup,InputGroupAddon,InputGroupText,Input,Container } from 'reactstrap'

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

function getCookie(name:string) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
var csrftoken = getCookie('csrftoken');

const login = async (user:User) =>{
    try{
     const req = await axios.post('http://localhost:8000/shop/login',user,
    //  {
    //      headers:{
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': csrftoken,
    //      }
        
    //  }
     );
     console.log(req);
     alert(req)
    } catch (error) {
        console.error(error);
        alert(error)
    }
}
    
export const AuthScreen = () => {

    
    const [userState,userDispatch] = useReducer(userReducer,user);
    const userUpdater = (event:React.ChangeEvent<HTMLInputElement>,action:userActionsType) =>
        userDispatch({type:action,payload:valueFromEvent(event)});
    // const userUpdater = useCallback((event:React.ChangeEvent<HTMLInputElement>,action:userActionsType) => {
    //     // console.log(event.target.value,action,event);
    //         userDispatch({type: action, payload: event.target.value});
    //       }, [userDispatch]);
    
    // useEffect(() => {
    //     console.log(userState);
    // }, [userState]);
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
                        <InputGroupText className='bg-white'>Email</InputGroupText>
                        </InputGroupAddon>
                        <Input value={userState.emailId} onChange={(e) =>{userUpdater(e,userActions.setEmail)}} placeholder="Email" />
                    </InputGroup>
                    <InputGroup className="w-50 mt-2">
                        <InputGroupAddon className='bg-white' addonType="prepend">
                        <InputGroupText className='bg-white'>Password</InputGroupText>
                        </InputGroupAddon>
                        <Input value={userState.password} type="password" onChange={(e) =>{userUpdater(e,userActions.setPass)}}  placeholder="password" />
                    </InputGroup>
                    <button onClick={()=>login(userState)} className="btn btn-warning text-dark mt-3" >Login</button>
                {/* </Container> */} 
                </Col>
            </Row>
        </div>
        </React.Fragment>

    )
}