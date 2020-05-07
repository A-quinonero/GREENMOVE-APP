import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import service from "../api/service";
import axios from "axios";

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { user: {}, members: [], notiInfo:[], notiLength:this.props.user.notifications.length };
  }
  
  getCreatorInfo = () => {
    service
      .getNotiInfo()
      .then((res) => {
        this.setState({
          notiInfo: res.notifications,
        });
      })
      .catch((err) => {
        console.log("Error getting the creator", err);
      });
  };

  closeNotificationMessage = async (e) => {
    const userId = this.props.user._id;
    const notiId = e.target.value;
   axios.post(process.env.REACT_APP_API_URI + `/api/delete-notification`, {
      notiId,
      userId,
    });
    this.getCreatorInfo();
  };

  componentDidMount() {
    this.getCreatorInfo();
  }

  render() {
    return (
      <div className=" m-4">
        <h3 className="text-center mb-5">Inbox</h3>
        <div>
          {this.state.notiInfo.map((noti) => {
            return (
              <div key={noti._id} className="row d-flex justify-content-center mb-3">
                <div>
                  <img
                    className="profileImgNoti  mr-3"
                    src={noti.creatorId.imageUrl}
                    alt=""
                  />
                </div>
                <div className="colorBgNoti align-content-center position-relative ">
                  <button
                    name="notifications"
                    value={noti._id}
                    onClick={(e) => this.closeNotificationMessage(e)}
                    className="closeNoti position-absolute"
                  >
                    ⅹ
                  </button>
                  <h5>
                    <b>
                      {noti.creatorId.name} {noti.creatorId.lastName}
                    </b>
                  </h5>
                  {/* <h5 className="colorTitleNoti"><i>{noti.eventId.title}</i></h5> */}
                  <p className="messageNoti">{noti.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withAuth(Notifications);
