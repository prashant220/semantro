

import React,{useState,useEffect} from 'react'
import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import { Modal, Button } from 'antd';
import '../css/rating.css'
import { Row, Col } from "antd";
export default function Rating(props) {

  
  const [isModalVisible, setIsModalVisible] = useState(false);
 
  const ratingChanged = (new_Rating) => {
   
   
    const bodyFormData = new FormData();
  bodyFormData.append('audio_id', props.id);
  bodyFormData.append('transcription', props.message);
  bodyFormData.append('feedback', new_Rating);
   
    axios({
      method: "post",
      url: "http://3.138.164.184:7000/feedback/",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    },[])
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
      console.log(new_Rating)
      
      setIsModalVisible(true);
    
  };
 
 
  const handleOk = () => {
    setIsModalVisible(false);
   

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
 console.log(ratingChanged)
  return (
   
      <Row>
   <Col xl={0} md={0} xs={0}></Col>
   <Col xl={24} md={24} xs={24}>
   <div className="rating-box">
      <p style={{fontSize:'16px',color:'black',color:'rgb(207, 72, 27)',margin:'auto',lineHeight:'28px',marginRight:'5%'}}>Rate this transcribe</p>
       
       
       
       <div>
   <Row>
     <Col xl={10} md={10} xs={7}></Col>
     <Col  md={14} xs={14}> 
     <ReactStars
    count={5}
    onChange={ratingChanged}
    size={26}
    activeColor="#ffd700"
   
    
    
  
  />
     </Col>
     <Col></Col>
   
  </Row>
  </div>
  
  <Modal title="Your rating has been submitted" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
  <div className="success alert">
   
  </div>
       
      </Modal>
    </div>
   </Col>
 
     

      
     
   
    </Row>
  )
}
