import React,{Component} from 'react';
import './Nav.css';
import history from './history';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state={
            val:''
        }
    }

    data=()=>{
        return this.state.val
    }

    logout=e=>{
        localStorage.removeItem('user');
        localStorage.removeItem('id');
        history.push('/');
    }

    getUser=e=>{
        if(e.target.value){
            let c=0
            let dataarray=[]
            axios.get('http://localhost:8000/api/candidatelike/'+e.target.value,  {
                headers: {
                    'Content-Type': 'application/json',
                 }
            }).then(res=>{
                res.data.forEach(element => {
                    console.log(element)
                    dataarray.push(<li key={c++}><div><a href={'/cand/profile/'+element.cand_id} >{element.cand_fname} {element.cand_lname}</a></div></li>)
                })
                this.setState({
                    val:dataarray,
                })  
            })
        }else{
            this.setState({
                val:'',
            })
        }       
    }

    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                <a className="navbar-brand" href="/cand/home">CoderConnect</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item ">
        <a className="nav-link" href="/cand/home">Home </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/cand/update">Update Details</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/cand/searchjobs">Search Jobs</a>
      </li>                 
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" onKeyUp={this.getUser}  type="search" placeholder="Search" aria-label="Search" />
      <span><ul className='suggestions'>{this.data()}</ul></span>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      <a className="nav-link" href="#" id="homePageLink" onClick={this.logout}> Logout</a>
    </form>
  </div>
</nav>
        );
    }
}

export default Nav;