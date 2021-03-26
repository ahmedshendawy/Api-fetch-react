import './App.css';
import React from 'react';
import {Alert} from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component{

  constructor(){
    super();
    this.state = {
    }

  }

  render(){

    return (
      <Router>
      <div>
        <nav>
          <ul className="list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/todo">Todo App</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/todo">
            <Todo />
          </Route>
          <Route path="/movies">
            <Movies />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
   };
  };

  class Home extends React.Component{

    constructor(){
      super();
      this.state = {
      }
    };
      render(){

        return (
          <div>
          <h1>Home...</h1>
          </div>
        );
      };
  };

  class Login extends React.Component{

      constructor(){
        super();
        this.state = {
          email: "",
          password:"",
          error:""
        }
      };

      login =  ()=>{
        console.log(this.state)
   fetch("https://reqres.in/api/login",{
          method:"POST",
          headers:{
              "content-type":"application/json"
          },
          body:JSON.stringify(this.state)
      }).then(res=>res.json()).then(res=>{
        if (res.error){
          this.setState({error:res.error})
        }else if(res.token){
          localStorage.token=res.token;
        }
      })
    }
    changeInput=(e)=>{
      let statepropname = e.target.name;
      this.setState({[statepropname]:e.target.value})
  }
        render(){
          return (
            <div className="container">
            <div className="input-group">
<div className="input-group-prepend">
    <span className="input-group-text">Email</span>
  </div>
<input className="form-control" type="email" value={this.state.email} name="email" onChange={this.changeInput} />
              </div>
<br/>
              <div className="input-group">
<div className="input-group-prepend">
    <span className="input-group-text">Password</span>
  </div>
               <input className="form-control" type="password" value={this.state.password} name="password" onChange={this.changeInput} />
               </div><br/>
             <div className="text-center"> <button type="button" className="btn btn-primary" onClick={this.login} >Login</button>
             </div>
             <br/>
             {this.state.error && <Alert variant="danger" onClose={(e)=>this.setState({error:""})} dismissible>
                    <Alert.Heading>Error</Alert.Heading>
                    <p>{this.state.error}</p>
                </Alert>}
            </div>
          )}}


  class Movies extends React.Component{

        constructor(){
          super();
          this.state = {
            data:[]
          }
        };

     async componentDidMount(){
      await fetch("https://reqres.in/api/users?page=2",{
        headers:{
          "token":localStorage.token
        }
      }).then(res=>res.json())
      .then(res=>{
        this.setState({data:res.data});
      });
    }
          render(){

            return (
              <div>
              <h2>Movies</h2>
              {this.state.data.map((item)=>{
                return <Movie key={item.id} item={item}/>
              })}
            </div>
            );
          }
        };

// Todo component
      
  class Todo extends React.Component{

    constructor(props){
      super(props);
      this.state={
        newItem:"",
        list:[],
      }
      }
      updateInput(key, value) {
        this.setState({ [key]: value });
      }
    
      addItem(){
        const newItem={
          id: 1 + Math.random(),
          value: this.state.newItem.slice()
        };
        const list = [...this.state.list];
    
        // add the new item to the list
        list.push(newItem);
        this.setState({
          list,
          newItem: "",
          completed: false,
        });
      }
    
      deleteItem(id) {
        // copy current list of items
        const list = [...this.state.list];
        // filter out the item being deleted
        const updatedList = list.filter(item => item.id !== id);
        this.setState({ list: updatedList });
      }
    
      updateItem(id) {
        // copy current list of items
        const list = [...this.state.list].map((item) =>{
       
        if (item.id == id){
          item.completed = ! item.completed;
        }
        return item;
        } )
        this.setState({ list: list });
      }
    
    
    
      render(){
        return (
          <div className="App">
              <div className="todo">
              Todo List
              <br />
              <div className ="input-group mb-3">
                <input type="text" className="form-control" value={this.state.newItem} onChange={e => this.updateInput("newItem", e.target.value)}/>
                <div className="input-group-append">
                  <button type="button" className="btn btn-dark" onClick={() => this.addItem()}> ADD </button>
                  </div></div>
              <br /> 
              <ul>
                {this.state.list.map(item => {
                  return (
    
                    <li key={item.id}>
                  <input
                    type="checkbox"
                    checked={item.completed}
                  />
                      <div className="items" >
                  {item.value}</div>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => this.deleteItem(item.id)}>&#x2715;</button> 

                      <button style={{ marginLeft: "3px"}} type="button" className="btn btn-success btn-sm" onClick={() => this.updateItem(item.id)}>&#10003;</button>
                      </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      }
    }
    
    class Movie extends React.Component{
      constructor(){
          super();
  
      }
  
      render(){
          
          return (
            <div className="card" style={{width: "300px",display:"flex"}}>
            <img src={this.props.item.avatar}  className="card-img-top" alt="..." />
            <div className="card-body">
               <h5 className="card-title">{this.props.item.first_name}</h5>
               <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
               <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
         </div>
          ) } }
export default App;
