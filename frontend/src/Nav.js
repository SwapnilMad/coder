import React,{Component} from 'react';
import './Nav.css';
import history from './history';
import axios from 'axios'

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
                    dataarray.push(<li key={c++}><div><a>{element.cand_fname} {element.cand_lname}</a></div></li>)
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
            <ul className="navcss">
                <li><div>CoderConnect </div></li>
                <li><input type="text" placeholder="Search" onKeyUp={this.getUser} /><span><ul className='suggestions'>{this.data()}</ul></span></li>
                
                <li><a href="#" id="homePageLink" onClick={this.logout}> Logout</a></li>
                <li><a href="#" id="homePageLink"> Upload Resume</a></li>
                <li><a href="searchjobs" id="homePageLink"> Search Jobs</a></li>
                <li><a href="update" id="homePageLink"> Update Profile Details</a></li>
                <li><a href="home" id="homePageLink"> Home</a></li>
                
            </ul>
        );
    }
}

export default Nav;