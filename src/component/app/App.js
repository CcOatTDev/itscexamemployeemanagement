import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../comfig/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class App extends Component {
  constructor(props){
    super(props)

    this.state ={
      employeeList : []
    }

    this.updateEmployee = this.updateEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  updateEmployee = (id) =>{
    this.props.history.push({
      pathname :"/Employee/"+id+"/Update",
      userid : id,
      type : "Update"
    });
  }

  deleteEmployee = (id) =>{
    console.log(id);
  }

  componentWillMount(){

  }

  loadDataList =()=>{
    
    const  url = "https://dummy-api.cm.edu/employees";
    const configs = {
      auth: { 
         username : config.config.username,
         password : config.config.password
      }
    }

    axios.get(url,configs)
    .then(res => {
      const users =res.data;
      this.setState({employeeList : users})
      //console.log(this.state.employeeList);

    })
    .catch(err =>{
      console.log(err);
    })
  }

  componentDidMount(){
    this.loadDataList();
  }

  componentDidUpdate(){
    this.loadDataList();
  }

  convertDate = (str) => {
      var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2), 
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
       
            <br/>
            <Table  striped bordered hover variant="dark">
            <tbody>
              <tr>                 
                    <td>Firstname</td>
                    <td>Lastnaame</td>
                    <td>Email</td>
                    <td>BirthDay</td>
                    <td colSpan ='2'>
                    <Link to={{
              pathname :"/Employee/Add"
            }
          }>
        <Button> Add Employee </Button></Link>

                    </td>
              </tr>
              {
                this.state.employeeList.map(data =>
                  <tr key={data._id}> 
                    <td>{data.firstname}</td>
                    <td>{data.lastname}</td>
                    <td>{data.email}</td>
                    <td>
                    { this.convertDate(data.birthday)}
                    </td>
                    <td><Button  variant="success" onClick={this.updateEmployee.bind(this,data._id)}> Update </Button></td>
                    <td><Button  variant="danger" onClick={this.deleteEmployee.bind(this,data._id)}> Delete </Button></td>
                  </tr>
                )
              }
            </tbody>
          </Table>
        </header>
      </div>
    );  
  }
}

export default App;
