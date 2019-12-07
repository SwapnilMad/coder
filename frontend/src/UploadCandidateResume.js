import React,{Component} from 'react';
import axios from 'axios'
import history from './history';
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';

class UploadCandidateResume extends Component {

  constructor(props) {
    super(props);
    this.state={
        resume:"",
        type:"",
        file:""
    }
    axios.get('http://localhost:8000/api/candidate/'+localStorage.getItem('user'),  {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res=>{
          this.setState({
              file:'../resumes/'+res.data.resume+'?'+new Date().getMilliseconds(),
              type:res.data.resume.split('.')[1]
          })
        console.log(this.file,this.type)
    }).catch(function (error) {
        console.log(error)
      });
  }

  handleSubmit=event=>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/candidate/resume/'+localStorage.getItem('user'),  this.state.resume)
    .then(res=>{
        window.location.reload()
      }).catch(error =>{
        console.log(error)
      });
  }

  uploadResume=event=>{
    event.persist()
    const fd =new FormData();
    fd.append('resume',event.target.files[0], event.target.files[0].name)
    this.setState({
      resume:fd
    })
  }

  onError=e=>{
      console.log(e,'File viewer')
  }

    render() {
      return (
        <div className='mainbody'>   
        {this.state.type ? (
        <FileViewer
        fileType={this.state.type}
        filePath={this.state.file}
        errorComponent={CustomErrorComponent}
        onError={this.onError}
        />
      ) : (
        <span>No Resume Found</span>
      )}
          
            <form onSubmit={this.handleSubmit}>
                <input type="file" onChange={this.uploadResume} /><br />
                <input type="submit" value="SUBMIT"/>
            </form>
        </div>

      );
    }
  }

  export default UploadCandidateResume;