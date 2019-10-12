import React,{Component} from 'react';
import './Nav.css';
import history from './history';

class Nav extends Component {

    logout=e=>{
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        history.push('/');
    }

    render() {
        return(
            <ul>
                <li><div>CoderConnect</div></li>
                
                <li><a href="#" id="homePageLink" onClick={this.logout}> Logout</a></li>
                <li><a href="#" id="homePageLink"> Upload Resume</a></li>
                <li><a href="#" id="homePageLink"> Search Jobs</a></li>
                <li><a href="update" id="homePageLink"> Update Profile Details</a></li>
                <li><a href="home" id="homePageLink"> Home</a></li>
            </ul>
        );
    }
}

export default Nav;