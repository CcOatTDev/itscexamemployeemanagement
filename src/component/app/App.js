import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props)

    this.state ={

    }

    this.addEmployee = this.addEmployee.bind(this);
  }

  addEmployee = () =>{
    console.log("Add");
  }


  render(){
    return (
      <div className="App">
        <header className="App-header">
        </header>

        <Link to="/AddEmployee"><button onClick={this.addEmployee}> Add Employee </button></Link>
      </div>
    );
  }
}

export default App;
