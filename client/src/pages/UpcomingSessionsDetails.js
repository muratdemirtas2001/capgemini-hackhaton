import React ,{ useState }from "react";
import "./Modal.css";
function UpcomingSessionDetails ({ closeDetailsModal,sessionDetail }) {
  const [currentSession,setCurrentSession]= useState(sessionDetail);

  console.log(sessionDetail);
  return (
    <div className="modalBackground">

     <div className="modalContainer">
        <div className="titleCloseButton">
        <button onClick={()=>closeDetailsModal(false)}>X</button>
        </div>

        <div className="title">
        <h3>Session Details</h3>
        </div>

        <div className="body" style={{ display:"flex",flexDirection:"column" ,alignItems:"flex-start" }}>


        </div>

        <div className="footer">
          <button onClick={()=>closeDetailsModal(false)} id="closeButton">Close</button>

        </div>
      </div>
    </div>
  );
}

export default UpcomingSessionDetails;
/*

 <div className="modalContainer">
        <div className="titleCloseButton">
        <button onClick={()=>closeModal(false)}>X</button>
        </div>

        <div className="title">
        <h3>Please tick the skills you want to update</h3>
        </div>

        <div className="body" style={{ display:"flex",flexDirection:"column" ,alignItems:"flex-start" }}>


        </div>

        <div className="footer">
          <button onClick={()=>closeModal(false)} id="closeButton">Cancel</button>
          <button type="button" className="btn btn-success">Update</button>
        </div>
      </div>

*/

