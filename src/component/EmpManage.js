import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import emp from '../model/employee';
import config from '../comfig/config';


class EmpManage extends Component{
  constructor(props) {
    super(props);

    this.state ={
      newEmployee : emp.employee,
      params : {
        userID : "",
        type : ""
      }
    }

    this.handleSubmit  = this.handleSubmit.bind(this);
    this.myChangeHandler = this.myChangeHandler.bind(this);
  }

  componentWillMount(){
    this.setState({params :this.props.match.params});
    this.setState({newEmployee : new emp.EmployeeModel().employee});
    
}

  componentDidMount(){

    console.log("params",this.state.params)
    if(this.state.params.type === "Update")
      this.getDataByUserID(this.state.params.userID);

    else
      this.setState({newEmployee:  new emp.EmployeeModel().employee});
  }

  updateUser =(e) =>{
    const  url = `https://dummy-api.cm.edu/employees/${this.state.params.userID}`;
    //console.log(url);
    const et = e.target;
    const  data = {
      firstname : et.firstname.value,
      lastname : et.lastname.value,
      birthday : et.birthday.value,
      email : et.email.value,
    };

    const configs = {
      auth: { 
         username : config.config.username,
         password : config.config.password
      }
  }

    axios.put(url,data,configs)
     .then(res => {
       const user =res.data;
       console.log(user);
     })
     .catch(err =>{
       console.log(err);
     })
  }

  addUser =(e) =>{

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
    }

    axios.post(url,data,configs)
     .then(res => {
       const user =res.data;
       console.log(user);

       this.setState({newEmployee  : ""});
     })
     .catch(err =>{
       console.log(err);
     })

}

getDataByUserID =(userid) => {
  let url = "https://dummy-api.cm.edu/employees/" + userid;

  const configs = {
    auth: { 
       username : config.config.username,
       password : config.config.password
    }
  }

  axios.get(url,configs)
    .then(res => {

      const userData =res.data;
      //console.log(userData);
      let dataUserr =  emp.employee;

      dataUserr._id = userData._id;
      dataUserr.firstname = userData.firstname;
      dataUserr.lastname = userData.lastname;
      dataUserr.email = userData.email;
      dataUserr.birthday = userData.birthday;

      this.setState({newEmployee  : dataUserr});

    })
    .catch(err =>{
      console.log(err);
    })
}

  
  handleSubmit(e) {
      //e.preventDefault();
      
      if(this.state.params.type === "Update"){
        this.updateUser(e);
      }else{
        this.addUser(e);
      }

      this.props.history.push("/EmployeeList");
 

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

  convertDate = (str) => {
    var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2), 
    day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }


  render(){
      return(
<div>
                <Form onSubmit={this.handleSubmit}>
                    <input type="hidden" id="userid"  name="userid"  value={this.state.newEmployee.userid}  />
                    <Row>
                    <Col></Col>
                    <Col>
                    <Form.Group  >
                        <Form.Label>firstname</Form.Label> 
                        <Form.Control type="text" id="firstname"  name="firstname" ref={node => (this.firstname = node)} onChange={this.myChangeHandler} value={this.state.newEmployee.firstname} required />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group >
                        <Form.Label>lastname</Form.Label>    
                        <Form.Control type="text" id="lastname" name="lastname" onChange={this.myChangeHandler}  value={this.state.newEmployee.lastname} required />
                    </Form.Group>
                    </Col>
                    <Col></Col>
                    </Row>

                    <Row>
                    <Col></Col>
                    <Col>
                    <Form.Group >
                        <Form.Label>birthday</Form.Label>   
                        <Form.Control type="date" id="birthday" name="birthday" onChange={this.myChangeHandler} value={this.convertDate(this.state.newEmployee.birthday)}  required />
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group >
                        <Form.Label>email</Form.Label>   
                        <Form.Control type="email" id="email" name="email" onChange={this.myChangeHandler} value={this.state.newEmployee.email}  required />
                    </Form.Group>
                    </Col>
                    <Col></Col>
                    </Row>
                        <center><Button variant="primary"  type="submit" value="Submit"> Submit </Button></center>
                </Form>

                <center><Link to="/"><Button variant="warning" > Back </Button></Link></center>
            </div>
      );
  }
}

export default EmpManage;
  