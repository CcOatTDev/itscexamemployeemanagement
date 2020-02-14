import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../comfig/config';

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
    console.log(id);
  }

  deleteEmployee = (id) =>{
    console.log(id);
  }

  componentDidMount(){
 
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
      console.log(this.state.employeeList);

    })
    .catch(err =>{
      console.log(err);
    })
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Link to="/AddEmployee"><button> Add Employee </button></Link>
      
        <br/>
        <br/>
        <table id='employee' border="1">
         <tbody>
            <tr>                 
                  <td>Firstname</td>
                  <td>Lastnaame</td>
                  <td>Birthday</td>
                  <td>Email</td>
                  <td></td>
                  <td></td>
            </tr>
            {
              this.state.employeeList.map(data =>
                <tr key={data._id}> 
                  <td>{data.firstname}</td>
                  <td>{data.lastname}</td>
                  <td>{data.birthday}</td>
                  <td>{data.email}</td>
                  <td><button onClick={this.updateEmployee.bind(this,data._id)}> Update </button></td>
                  <td><button onClick={this.deleteEmployee.bind(this,data._id)}> Delete </button></td>
                </tr>
              )
            }
          </tbody>
        </table>

      </div>
    );  
  }
}

export default App;
