import React,{Component} from 'react';
import './EmpNav.css';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';

class EmpNav extends Component {

    logout=e=>{
        localStorage.removeItem('emp_user');
        localStorage.removeItem('emp_id');
        history.push('/empregister');
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/home">CoderConnect</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item ">
                    <a className="nav-link" href="home">Home </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="update">Update Details</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="jobpost">Post Jobs</a>
                </li>   
                </ul>
                <span className="nav-item mr-sm-2"><a className="nav-link " href="#" id="homePageLink" onClick={this.logout}> Logout</a></span>              
                
                </div>
            </nav>
        );
    }
}

export default EmpNav;