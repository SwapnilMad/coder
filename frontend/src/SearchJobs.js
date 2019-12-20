import React,{Component} from 'react';
import axios from 'axios'
import Modal from 'react-modal';
import './SearchJobs.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement('#root')
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      width                 : '80%',
      height                : '80%',
      transform             : 'translate(-50%, -50%)',
      color:'black'
    }
  };

class SearchJobs extends Component{

    constructor(props) {
        super(props);
        this.state={
            val:"",
            cnt:0,
            title:'',
            designation:'',
            description:'',
            expiry_date:'',
            date_created:'',
            e_id:'',
            company:''
        }
        this.getData()        
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getData=()=>{
        let c=0
        let dataarray=[]
        axios.get('http://localhost:8000/api/jobs',  {
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
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.e_id} />)
                dataarray.push(<div key={c++}>{element.job_title}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.job_title} />)
                dataarray.push(<div key={c++}>{element.designation}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.designation} />)           
                dataarray.push(<div key={c++}>{element.date_created}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.date_created} />)
                dataarray.push(<div key={c++}>{element.expiry_date}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.expiry_date} />)
                dataarray.push(<div key={c++}>{element.short_description}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.short_description} />)
                dataarray.push(<div key={c++}><input id={c++} onClick={this.openModal} className="btn btn-light" type="button" value="Apply" /></div>)
            });
            this.setState({
                val:dataarray,
                cnt:count
            })                             
        }).catch(function (error) {
            console.log(error)
        })
    }

    getJobs=(e)=>{
        let c=0
        let dataarray=[]
        axios.get('http://localhost:8000/api/jobs/search',  {
            headers: {
                'Content-Type': 'application/json',
             },
             params:{
                keywords:e.target.value
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
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.e_id} />)
                dataarray.push(<div key={c++}>{element.job_title}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.job_title} />)
                dataarray.push(<div key={c++}>{element.designation}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.designation} />)           
                dataarray.push(<div key={c++}>{element.date_created}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.date_created} />)
                dataarray.push(<div key={c++}>{element.expiry_date}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.expiry_date} />)
                dataarray.push(<div key={c++}>{element.short_description}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.short_description} />)
                dataarray.push(<div key={c++}><input id={c++} onClick={this.openModal} className="btn btn-light" type="button" value="Apply" /></div>)
            });
            this.setState({
                val:dataarray,
                cnt:count
            })                             
        }).catch(function (error) {
            console.log(error)
        })
    }

    openModal=e=> {
        let id=e.target.id
        this.setState({
            modalIsOpen: true,
            e_id:document.getElementById(id-11).value,
            title:document.getElementById(id-9).value,
            designation:document.getElementById(id-7).value,
            date_created:document.getElementById(id-5).value,
            expiry_date:document.getElementById(id-3).value,
            description:document.getElementById(id-1).value
        });
        axios.get('http://localhost:8000/api/employer/id/'+document.getElementById(id-11).value,  {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res=>{
            this.setState({
                company:res.data.emp_fname
            })
        })
        
    }
    
    afterOpenModal() {
    // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }
    
    closeModal() {
        this.setState({modalIsOpen: false});
    }

    data=()=>{
        return this.state.val
    }


    render(){
        return(
            <div  className='mainbody editcandedu'>
                <input type="text" placeholder="Search Jobs"  onKeyUp={this.getJobs} />
                <div className="editjobsgrid">
                    {this.state.val}
                </div>  
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                    >
            
                    <h2 id='applyjob' ref={subtitle => this.subtitle = subtitle}>Apply Job</h2>
                    <a href="#" onClick={this.closeModal} className="closejobmodal"></a>
                    <form  onSubmit={this.handleSubmit}>
                        <div className="applyjobgrid">
                            <div>Organisation</div>
                            <div>{this.state.company}</div>
                            <div>Job Title</div>
                            <div>{this.state.title}</div>
                            <div>Designation:</div> 
                            <div>{this.state.designation}</div>
                            <div>Expiry:</div>
                            <div>{this.state.expiry_date}</div>
                            <div>Job Description:</div>
                            <div>{this.state.description} </div>
  
                        </div>  
                            <input type="submit" className="btn btn-dark" value="Apply" />
                    </form> 
                </Modal>
            </div>         
        );
    }
}

export default SearchJobs;