import React, { Component } from 'react';
import axios from 'axios';
import emp from '../model/employee';
import config from '../comfig/config';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


class AddEmp extends Component{
  constructor(props) {
    super(props);

    this.state ={
      newEmployee : emp.employee,
    }

    this.handleSubmit  = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  componentDidMount(){
 
  }

  
  handleSubmit(e) {
    //e.preventDefault();
    const  url = "https://dummy-api.cm.edu/employees";
    const  data = {
      firstname : this.state.newEmployee.firstname,
      lastname : this.state.newEmployee.lastname,
      birthday : this.state.newEmployee.birthday,
      email : this.state.newEmployee.email,
    };

    const configs = {
        auth: { 
           username : config.config.username,
           password : config.config.password
        }
        //,
        //headers: {
        //    //'Content-Type' : 'application/json',
        //    'Access-Control-Allow-Origin': '*',
        //    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        //    'Access-Control-Allow-Headers': 'Origin, Authorization, Content-Type, Accept',
        //    'Authorization' : `Basic dXNlcjk6RmVlWHNWU2tWMHVQaW84bm44TkM`
        //    }
    }

    axios.post(url,data,configs)
        //{ headers: {"Authorization" : `Basic ${config.config.token}`}}
        //)
     .then(res => {
       const user =res.data;
       console.log(user);

       this.setState({newEmployee  : ""});
     })
     .catch(err =>{
       console.log(err);
     })


    this.setState({newEmployee  : ""});
  }

  myChangeHandler = (event) => {
    let name = event.target.name;
    let val = event.target.value;

    let dataEmployee = this.state.newEmployee;
    if(name === "firstname" ){
        dataEmployee.firstname = val;
    }
    else if(name === "lastname" ){
        dataEmployee.lastname = val;
    }
    else if(name === "birthday" ){
        dataEmployee.birthday = val;
    }
    else if(name === "email" ){
        dataEmployee.email = val;
    }

    this.setState({newEmployee  : dataEmployee});
  }

  render(){
      return(
        <div>
      
            {this.state.newEmployee.firstname} {this.state.newEmployee.lastname} {this.state.newEmployee.birthday} {this.state.newEmployee.email}
            <br/>
            <form onSubmit={this.handleSubmit}>
            <h3>firstname</h3>  <input type="text" id="firstname"  name="firstname" onChange={this.myChangeHandler}/>
            <h3>lastname</h3>   <input type="text" id="lastname" name="lastname" onChange={this.myChangeHandler}/>
            <h3>birthday</h3>   <input type="date" id="birthday" name="birthday" onChange={this.myChangeHandler}/>
            <h3>email</h3>   <input type="email" id="email" name="email" onChange={this.myChangeHandler}/>
              <input type="submit" value="Submit" />
            </form>

            <Link to="/"><button onClick={this.addEmployee}> Back</button></Link>
        </div>
      );
  }
}

export default AddEmp;
  