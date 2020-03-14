
import React, { Component } from 'react';
import './App.css';
import { Container, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      index: '',
      act:0
    }
    
}
  componentDidMount() {
    this.fetchAPI()
  }
  async fetchAPI() {
    const url = 'https://ecell.nitrr.ac.in/events/list/2019/?format=json'
    fetch(url)
      .then(response => response.json())
      .then(response => {
        this.setState({
          data: response.data
        })
        console.log(this.state.data)
      }).catch(e => console.log(e))
  }
  render() {
    var datas = this.state.data
   console.log(datas) 
   return (
      <div className="container">
        <form ref="myForm">
          <div className="form-group row">
            <label for="" className="col-sm-2 col-form-label">Event Name</label>
            <div className="col-sm-10">
            <input type="text" ref="name" placeholder="Event name" className="form-control"/>
            </div>
          </div>
          <div className="form-group row">
            <label for="" className="col-sm-2 col-form-label">Event Venue</label>
            <div className="col-sm-10">
            <input type="text" ref="venue" placeholder="Event Venue" className="form-control"/>
            </div>
          </div>
          <div className="form-group row">
            <label for="" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-10">
            <input type="text" ref="email" placeholder="Email" className="form-control"/>
            </div>
          </div>
          <button onClick={(e)=>this.fSubmit(e)} className="btn btn-success">Submit</button>
          </form>
          <div className="container">
        <table className="table">
          <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Details</th>
            <th scope="col">Venue</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
          </thead>
          <tbody>
       {datas.map((event,index) => (
        <tr key = {index + 1}>
          <th scope="row">{index+1}</th>
          <td>{event.name}</td>
          <td>{event.details}</td>        
          <td>{event.venue}</td>
          <td>{event.email}</td>
          <td>
            <button className={event.showHide ? "hidden": "btn btn-success"} onClick={() => this.fEdit(event,index)}>Update</button>
            <button className={event.showHide ? "hidden": "btn btn-danger"} onClick={() => this.fRemove(index)}>Delete</button>
            
          </td>
        </tr>
       ))}
       </tbody>
       </table>
       </div>
      </div>
    )
  }
  fSubmit(e){
   e.preventDefault();
   e.showHide = false;                                                                         
    console.log('try');
    let datas =  this.state.data;
    //console.log(datas[1])
    let name = this.refs.name.value;
    let venue = this.refs.venue.value;
    let email = this.refs.email.value
    if(this.state.act === 0){
      let d = {
        name, venue, email
      }
      datas.push(d);
    }
    else{
      let index = this.state.index;
      console.log(index)
      datas[index].name = name;
      datas[index].venue = venue;
      datas[index].email = email;
    }
    this.setState({
      data: datas
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  }
  fRemove(e){
    let datas = this.state.data;
    datas.splice(e,1);
    this.setState({
      data: datas
    });
    this.refs.myForm.reset();
    this.refs.name.focus();
  }
  fEdit(event,e){
   // event.showHide = true;
    let d = this.state.data[e];
    this.refs.name.value = d.name;
    this.refs.venue.value = d.venue;
    this.refs.email.value = d.email;
    this.setState({
      act:1,
      index:e
    })
    this.refs.name.focus()
  }
}

export default App;

