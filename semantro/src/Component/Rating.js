import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-rating-stars-component";
import "../css/rating.css";
import { Row, Col,Alert } from "antd";
import { feedback } from "../api/data";
export default function Rating(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const ratingChanged = (new_Rating) => {
    var data = {
      audio_id: props.id,
      transcription: props.message,
      feedback: new_Rating,
    };
    const bodyFormData = new FormData();
    bodyFormData.append("data", JSON.stringify(data));
    axios(
      {
        method: "post",
        url: feedback,
        data: bodyFormData,

        headers: { "Content-Type": "multipart/json" },
      },
      []
    )
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
    console.log(new_Rating);

    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Row>
      <Col xl={0} md={0} xs={0}></Col>
      <Col xl={24} md={24} xs={24}>
        <div className="rating-box">
          <p
            style={{
              fontSize: "16px",
              color: "black",
              color: "rgb(207, 72, 27)",
              margin: "auto",
              lineHeight: "28px",
              marginRight:'6%'
          
            }}
          >
            Rate this transcribe
          </p>

          <div>
            <Row>
              <Col xl={10} md={10} xs={7}></Col>
              <Col  md={14} xs={14} >
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={26}
                  activeColor="#ffd700"
                />
              </Col>
              <Col></Col>
            </Row>
            {
              isModalVisible?  
              <div style={{margin:'auto',width:'20%',marginRight:'42%'}}> <Alert message="Thank you for rating us!" type="success" showIcon /></div>
              
               :null
            }
          </div>
          {/*   
  <Modal title="Your rating has been submitted" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
  <div className="success alert">
   
  </div>
       
      </Modal> */}
    
        </div>
      </Col>
    </Row>
  );
}
