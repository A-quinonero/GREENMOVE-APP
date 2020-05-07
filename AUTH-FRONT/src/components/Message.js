import React, { Component } from "react";
import service from "../api/service";
import { Redirect } from "react-router-dom";



class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      members: [],
      creator: "",
      notifications: "",
      eventId:"" ,
      redirect: false
    };
  }
 
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/private/modal-message' />
    }
  }
  handleSubmit = (e) => {
      e.preventDefault();
      service
      .addMessage(this.state)
      .then((res) => {
        this.setState({
          redirect: true
        })
        console.log("Sent", res);
        })
        .catch((err) => {
            console.log("Error while adding the thing:", err);
        });
    };
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value, eventId: this.props.eventId, members: this.props.members, creator:this.props.creator });
      };



    render() {
     
      
    
     if (this.props.creator === this.props.userId) {
    return (
     
      <form onSubmit ={(e)=> this.handleSubmit(e)}>
        <div className="text-center ">
          <div>
           
            
            <div className="textAreaCreator m-3">
              <textarea
                name="notifications"
                value={this.state.notifications}
                onChange={(e) => this.handleChange(e)}
                placeholder="escribe un mensaje..."
              ></textarea>
            </div>
            <div className="text-center m-3 ">
            {this.renderRedirect()}
              <button  onClick={this.setRedirect} className="btn btnOrange">
                Send it!
              </button>
            </div>
          </div>
        </div>
      </form>
     
      
    );  
     }else{
         return(<div></div>)
     }
  }
}
export default Message;
