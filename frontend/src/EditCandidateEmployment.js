import React,{Component} from 'react';
import './UpdateProfile.css';
import axios from 'axios'
import history from './history';

class EditCandidateEmployment extends Component {

    constructor(props) {
        super(props);

        axios.get('http://localhost:8000/api/candidate/employment/'+localStorage.getItem('id'),  {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res => {
            console.log(res)
            let data='<div class="editedugrid"><div>Sr. No</div><div>Company Name</div><div>Designation</div><div>From Date</div><div>To Date</div><div>Action</div>'
            let count=1;
            res.data.forEach(element => {
                data=data+'<div>'+(count++)+'</div><div><input type="text" value="'+element.company_name+'"/></div><div><input type="text" value="'+element.designation+'"/></div><div><input type="date" value="'+element.from_date+'"/></div><div><input type="text" value="'+element.to_date+'"/></div><div><input type="button" value="update" /><button onClick="{this.delete()}" ref="'+element.edu_id+'" >Delete</button></div>'
            });
            data=data+"</div>"
            this.refs['employment'].innerHTML=data
            console.log(this.refs['1'])

            /*this.refs['education'].addEventListener("nv-enter", this.handleNvEnter);*/
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div ref='employment' className='editcandedu'></div>
        );
    }
}

export default EditCandidateEmployment;