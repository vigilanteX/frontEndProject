import React, { Component} from "react";
import Dankmemes from './component/Dankmemes'
import {BrowserRouter as Router, Route,Switch, Redirect} from "react-router-dom";
import register from "./component/register";
import '../src/App.css'
class App extends Component {

  render(){
    return(
      <Router>
        <div className = "App">
          <Switch>
            <Route exact path="/register" component={register}/>
            <Route exact path='/dank' component={Dankmemes}/>

            <Route path="/" render={()=> <Redirect to="/register"/>}/>
          </Switch>
        </div>
      </Router>

    );
  }
}
export default App;