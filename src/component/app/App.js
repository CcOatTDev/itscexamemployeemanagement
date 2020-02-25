import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../../comfig/config';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';


class App extends Component {
  constructor(props){
    super(props)

    this.state ={
      employeeList : []
    }

  }

  componentWillMount(){

  }


  componentDidMount(){

  }

  componentDidUpdate(){

  }

  convertDate = (str) => {
      var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2), 
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }

  handleSubmit(e) {
     // e.preventDefault();
    const  url = "https://dummy-api.cm.edu/employees";

    const et = e.target;
    const  userConfig = {
      username : et.username.value,
      password : et.password.value,
    };

    const configs = {
      auth: { 
         username : userConfig.username,
         password : userConfig.password
      }
    }

    axios.get(url,configs)
    .then(res => {
      const users =res.data;
      //this.setState({employeeList : users})
      //console.log(users);

      config.config = {
        username : userConfig.username,
        password : userConfig.password
      }

      console.log(config.config );
      
      window.location.href = "/EmployeeList"; 
      //this.props.history.push("/EmployeeList");
    })
    .catch(err =>{
      console.log(err);
      config.config = {
        username : "",
        password : ""
      }

      return (
        <Alert key='' variant='danger'>
            Login Fail !
        </Alert> 
        );
    })


}


  render(){
    return (
      
      <div className="App">
        <header className="App-header">

          <Form onSubmit={this.handleSubmit}>
                    <Row>
                    <Col></Col>
                    <Col>
                    <Form.Group  >
                        <Form.Label>Username</Form.Label> 
                        <Form.Control type="text" id="username"  name="username"   required />
                    </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group >
                        <Form.Label>Password</Form.Label>    
                        <Form.Control type="password" id="password" name="password"  required />
                    </Form.Group>
                    </Col>
                    <Col></Col>
                    </Row>
                    <center><Button variant="primary"  type="submit" value="Submit"> Log in</Button></center>
          </Form>


        </header>
      </div>
    );  
  }
}

export default App;
