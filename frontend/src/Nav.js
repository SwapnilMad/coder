import React,{Component} from 'react';
import './App.css';
import history from './history';

class Nav extends Component {

    logout=e=>{
        localStorage.removeItem('user');
        history.push('/');
    }

    render() {
        return(
            <div id="header">
                <div className="grid-container">
                    <div className="grid-item left">CoderConnect</div>
                        <div className="grid-item right">
                            <a href="home" id="homePageLink"> Home</a>
                            <a href="update" id="homePageLink"> Update Profile Details</a>
                            <a href="#" id="homePageLink"> Search Jobs</a>
                            <a href="#" id="homePageLink"> Upload Resume</a>
                            <a href="#" id="homePageLink" onClick={this.logout}> Logout</a>
                        </div>
                    </div>
                </div>
            );
    }
}

export default Nav;