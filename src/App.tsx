// import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import { AuthScreen } from './shop/login';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { HomeScreen} from './shop/home';


function Layouts() {
  return (
    <Switch>
      <Route path="/auth" component={AuthScreen} />
      <Route path="/home" component={HomeScreen} />
      <Redirect from="/" to="/auth" exact />
      {/* <Route path="/" component={NotFound} /> */}
    </Switch>
  );
}


function App() {
  return (
    <BrowserRouter>
    <Layouts/>
      {/* <Switch>
        <Route exact path="/home" component={HomeScreen}></Route>
        <Route exact path="/Components"><Topic/></Route>
        <Route path="/login"><AuthScreen/></Route>
      </Switch> */}
    </BrowserRouter>
    // <AuthScreen/>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <Counter />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <span>
    //       <span>Learn </span>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux
    //       </a>
    //       <span>, </span>
    //       <a
    //         className="App-link"
    //         href="https://redux-toolkit.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Redux Toolkit
    //       </a>
    //       ,<span> and </span>
    //       <a
    //         className="App-link"
    //         href="https://react-redux.js.org/"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         React Redux
    //       </a>
    //     </span>
    //   </header>
    // </div>
  );
}

export default App;
