import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  Row,
  message,
  Col,
  Button,
  Input,
  Form,
  Card,
  Alert,
  Rate,
} from "antd";
import { r_getSpeechIntoText } from "../api/request";
import "../css/converter_box.css";
const { TextArea } = Input;

export default function Converterbox(props) {
 
  const [visible, setVisible] = useState(false);
  const[disable,setDisable]=useState(true)

  console.log(props.value)
  const displayMessage = () => {
    setVisible(true)
    setTimeout(() => {setVisible(false)}, 3000)
  };
  return (
    <div>
      <div>
      <Row>
          <Col xl={7} md={24} xs={6}  ></Col>
          <Col xl={10} md={10}>
            <p className="converted_text">Converted Nepali Text</p>
          </Col>
          <Col xl={2} md={3} xs={7}></Col>
          <Col >{visible ?<p style={{fontSize:'16px',color:'red'}}>Copied!</p> : null}</Col>
          <Col >
          
              <CopyToClipboard text={props.value}>
                {
                  props.value?     <button className="copy" onClick={displayMessage}>
                  Copy to clipboard
                </button>:
              <  button disabled={disable} className="copy" onClick={displayMessage}>
                Copy to clipboard
              </button>
                }
         
            </CopyToClipboard>
            
     
          </Col>
        </Row>

        {/* <TextArea
          className="textarea-for-text"
          placeholder="Speech To Text Here"
          value={props.value}
         
          style={{
            transition:
              "border-color .15s ease-in-out,box-shadow .15s ease-in-out",
            position: "inherit",
            height: "40vh",
            width: "100%",
          }}
        /> */}
        <TextArea   value={props.value}style={{height:"40vh"}} />
      </div>
    </div>
  );
}
