import React,{Component} from 'react';
import './EmpNav.css';
import history from './history';

class EmpNav extends Component {

    logout=e=>{
        localStorage.removeItem('emp_user');
        localStorage.removeItem('emp_id');
        history.push('/');
    }

    render() {
        return(
            <ul>
                <li><div>CoderConnect</div></li>
                
                <li><a href="#" id="homePageLink" onClick={this.logout}> Logout</a></li>
                <li><a href="#" id="homePageLink"> Search Candidate</a></li>
                <li><a href="#" id="homePageLink"> Post Jobs</a></li>
                <li><a href="update" id="homePageLink"> Update Profile Details</a></li>
                <li><a href="home" id="homePageLink"> Home</a></li>
            </ul>       
        );
    }
}

export default EmpNav;