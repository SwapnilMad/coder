import React,{Component} from 'react';
import './EditJobPost.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import Modal from 'react-modal';

Modal.setAppElement('#root')
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      color:'black'
    }
  };
class EditJobPost extends Component{

    constructor(props) {
        super(props);
        this.state={
            val:"",
            cnt:0,
            modalIsOpen: false,
            title:'',
            designation:'',
            description:'',
            expiry_date:'',
            job_id:''
        }
        this.getData()
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    openModal=e=> {
        let id=e.target.id
        this.setState({
            modalIsOpen: true,
            job_id:document.getElementById(id-10).value,
            title:document.getElementById(id-8).value,
            designation:document.getElementById(id-6).value,
            description:document.getElementById(id-4).value,
            expiry_date:document.getElementById(id-2).value
        });
    }
    
    afterOpenModal() {
    // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    deletefun=e=>{
        let id=e.target.id
        axios.delete('http://localhost:8000/api/jobs/'+document.getElementById(id-11).value,  {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res=>{
            window.location.reload();
        }).catch(function (error) {
            console.log(error)
        })
    }

    handleSubmit=e=>{
        e.preventDefault();
        let data=JSON.stringify({
          title:this.state.title,
          designation:this.state.designation,
          expiry_date:this.state.expiry_date,
          description:this.state.description
        });

        axios.put('http://localhost:8000/api/jobs/'+this.state.job_id,  data ,  {
        headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            window.location.reload();
        }).catch(function (error) {
            console.log(error);
        })
    }

    getData=()=>{

        let c=0
        let dataarray=[]
        axios.get('http://localhost:8000/api/jobs/'+localStorage.getItem('emp_id'),  {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res => {
            dataarray.push(<div key={c++}>Sr. No</div>)
            dataarray.push(<div key={c++}>Job Title</div>)
            dataarray.push(<div key={c++}>Designation</div>)
            dataarray.push(<div key={c++}>Date Created</div>)
            dataarray.push(<div key={c++}>Job Expiry</div>)
            dataarray.push(<div key={c++}>Description</div>)
            dataarray.push(<div key={c++}>Action</div>)
            let count=1;
            res.data.forEach(element => {
                dataarray.push(<div key={c++}>{count++}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.job_id} />)
                dataarray.push(<div key={c++}>{element.job_title}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.job_title} />)
                dataarray.push(<div key={c++}>{element.designation}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.designation} />)           
                dataarray.push(<div key={c++}>{element.date_created}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.short_description} />)
                dataarray.push(<div key={c++}>{element.expiry_date}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.expiry_date} />)
                dataarray.push(<div key={c++}>{element.short_description}</div>)
                dataarray.push(<div key={c++}><input id={c++} onClick={this.openModal} type="button" value="Edit" /><button id={c++} onClick={this.deletefun} >Delete</button></div>)
            });
            this.setState({
                val:dataarray,
                cnt:count
            })               
        }).catch(function (error) {
            console.log(error)
        })
    }

    data=()=>{
        return this.state.val
    }

    render(){
        return(
            <div>
                <div className='editcandedu'>
                    <div className="editjobsgrid">
                    {this.data()}    
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
            
                    <h2 id='jobposth' ref={subtitle => this.subtitle = subtitle}>Edit Job Posts</h2>
                    <a href="#" onClick={this.closeModal} className="closejobmodal"></a>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="jobgrid">
                            <p>Job Title</p>
                            <input type="text" onChange={this.handleChange} name="title" className="Job Title text_signup" defaultValue={this.state.title}/>
                            <p>Designation:</p> 
                            <input type="text" name="designation" onChange={this.handleChange} className="companyName text_signup" defaultValue={this.state.designation}/>
                            <p>Expiry:</p>
                            <input type="date" name="expiry_date" onChange={this.handleChange} defaultValue={this.state.expiry_date}/>
                            <p>Job Description:</p>
                            <textarea rows="3" cols="40" onChange={this.handleChange} name="description"  defaultValue={this.state.description} />
                                    
                        </div>
                        <center>
                            <input type="submit" value="Update" />
                        </center>    
                    </form> 
                </Modal>
            </div>
        );
    }

}

export default EditJobPost;