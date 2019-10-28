import React,{Component} from 'react';
import './UpdateProfile.css';
import axios from 'axios'
import history from './history';

class EditCandidateEmployment extends Component {

    constructor(props) {
        super(props);

        this.state={
            val:"",
            cnt:0
        }
        this.getData()
        
    }

    getData=()=>{
        let c=0
        let dataarray=[]
        axios.get('http://localhost:8000/api/candidate/employment/'+localStorage.getItem('id'),  {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res => {
            dataarray.push(<div key={c++}>Sr. No</div>)
            dataarray.push(<div key={c++}>Company Name</div>)
            dataarray.push(<div key={c++}>Designation</div>)
            dataarray.push(<div key={c++}>From Date</div>)
            dataarray.push(<div key={c++}>To Date</div>)
            dataarray.push(<div key={c++}>Action</div>)
            let count=1;
            res.data.forEach(element => {
                dataarray.push(<div key={c++}>{count++}</div>)
                dataarray.push(<input key={c++} type='hidden' id={c} value={element.eh_id} />)
                dataarray.push(<div key={c++}><input id={c} type="text" defaultValue={element.company_name} /></div>)
                dataarray.push(<div key={c++}><input id={c} type="text" defaultValue={element.designation} /></div>)
                dataarray.push(<div key={c++}><input id={c} type="date" defaultValue= {element.from_date}/></div>)
                dataarray.push(<div key={c++}><input id={c} type="date" defaultValue={element.to_date}/></div>)
                dataarray.push(<div key={c++}><input id={c++} onClick={this.update} type="button" value="update" /><button id={c++} onClick={this.deletefun} >Delete</button></div>)
            });
            this.setState({
                val:dataarray,
                cnt:count
            })
        }).catch(function (error) {
            console.log(error)
        })

    }

    update(event){
        let did=event.target.id
        let eh_id=document.getElementById(did-5).value
        let company_name=document.getElementById(did-4).value
        let designation=document.getElementById(did-3).value
        let from=document.getElementById(did-2).value
        let to=document.getElementById(did-1).value
        let data=JSON.stringify({
            employer:company_name,
            designation:designation,
            emp_fromdate:from,
            emp_todate:to,
        });
        
        axios.put('http://localhost:8000/api/candidate/employment/'+eh_id, data, {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res=>{
            window.location.reload();
        }).catch(function (error) {
            console.log(error)
        })
    }

    deletefun(event){
        let did=event.target.id
        let eh_id=document.getElementById(did-6).value
        axios.delete('http://localhost:8000/api/candidate/employment/'+eh_id,  {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res=>{
            window.location.reload();
        }).catch(function (error) {
            console.log(error)
        })
    }

    data=()=>{
        return this.state.val
    }

    addElem=event=>{
        let count=this.state.cnt
        let c=100+(count*7)
        let dataarray=this.state.val
        dataarray.push(<div key={c++}>{count++}</div>)
        dataarray.push(<div key={c++}><input id={c} type="text" defaultValue='' /></div>)
        dataarray.push(<div key={c++}><input id={c} type="text" defaultValue='' /></div>)
        dataarray.push(<div key={c++}><input id={c} type="date" defaultValue= ''/></div>)
        dataarray.push(<div key={c++}><input id={c} type="date" defaultValue=''/></div>)
        dataarray.push(<div key={c++}><button id={c++} onClick={this.insert} >Insert</button></div>)
        this.setState({
            val:dataarray,
            cnt:count
        })
    }

    insert(event){
        let did=event.target.id
        let company_name=document.getElementById(did-4).value
        let designation=document.getElementById(did-3).value
        let from=document.getElementById(did-2).value
        let to=document.getElementById(did-1).value
        let data=JSON.stringify({
            cand_id:localStorage.getItem('id'),
            employer:company_name,
            designation:designation,
            emp_fromdate:from,
            emp_todate:to,
        });
        
        axios.post('http://localhost:8000/api/candidate/employment', '['.concat(data).concat(']'), {
            headers: {
                'Content-Type': 'application/json',
             }
        }).then(res=>{
            window.location.reload();
        }).catch(function (error) {
            console.log(error)
        })
    }

    render() {
        return (
            <div ref='employment' className='editcandedu'>
                <div className="editedugrid">
                {this.data()}    
                </div>
                <button onClick={this.addElem} className='addbutton'>Add</button>
            </div>
        );
    }
}

export default EditCandidateEmployment;