import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';



class EmployerHome extends Component{
    render() {
        return(
        <div>
          <div id="main">
        { /*<Register /> */}
          </div>
          <div id="footer">
          <a href="#" id="forgot_pass">Contact Us</a>
        </div>
      </div>
        );


    }

}

export default EmployerHome;