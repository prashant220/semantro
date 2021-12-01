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
  const [display, setDisplay] = useState("");
  const [visible, setVisible] = useState(false);
  const displayMessage = () => {
    setVisible(true)
    setTimeout(() => {setVisible(false)}, 3000)
  };
  return (
    <div>
      <div className="text-border">
        <Row>
          <Col xl={7} md={12} xs={4}  ></Col>
          <Col xl={10} >
            <p className="converted_text">Converted Nepali Text</p>
          </Col>
          <Col xl={2} md={3} xs={6}></Col>
          <Col >{visible ?<p style={{fontSize:'16px',color:'red'}}>Copied!</p> : null}</Col>
          <Col >
            
            <CopyToClipboard text={props.value}>
              <button className="copy" onClick={displayMessage}>
                Copy to clipboard
              </button>
            </CopyToClipboard>
          </Col>
        </Row>

        <TextArea
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
        />
      </div>
    </div>
  );
}
