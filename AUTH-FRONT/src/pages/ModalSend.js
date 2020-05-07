import React, { Component } from 'react'
import {Link} from "react-router-dom";
import  send  from "../img/send.png"
import { withAuth } from "../lib/AuthProvider";
class ModalSend  extends Component{
  constructor(props){
    super(props)
    this.state ={user:{}, members:[]}

  }
  
  componentDidMount = () => {
    this.setState(this.props.user)
   
  }
  render() {
    return (
      <div className = "mt-5">
          <div className ="text-center">
            <img className="modalImg" src={send} alt=""/>
        </div>
          <div className = "text-center mt-4 textModal">
          <p>Hi <b>{this.state.name}</b> !</p>
          <p>Your message has been</p>
          <p> sent to all the members </p>
          <p>of this action</p>
          
          </div>
          <div className = "text-center mt-4 textModal2 mb-3">
            <p><i>You must be the change you want</i> </p>
            <p> <i>to see in the world</i> </p>
            <p> <i>- Gandhi</i></p>
            
          </div> 
          <div className="text-center pb-3">
          <Link style={{ textDecoration: 'none' }} to="/private"><button className="btn btnOrange">Back to Explore</button></Link>
          </div>
          <div className="text-center">
          <Link style={{ textDecoration: 'none' }} to="/private/my-profile"><button className="btn btnBlue">Go to Profile</button></Link>
          </div>
        </div>
    )
  }
}

export default withAuth(ModalSend)
