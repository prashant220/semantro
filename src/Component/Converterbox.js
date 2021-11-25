import React, { Component } from "react";
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
import '../css/converter_box.css'
const { TextArea } = Input;

export default class Converterbox extends Component {
  state = {
    speechText: "",
  };

  render(props) {
    const key = "updatable";

    const openMessage = () => {
      message.loading({ content: "Loading...", key });
      setTimeout(() => {
        message.success({ content: "Copied!", key, duration: 1 });
      }, 1);
    };

    return (
      <div>
        <div className="text-border">
          <Row>
            <Col xl={7} md={9} xs={4}></Col>

            <Col xl={8} md={4} xs={20} >
              <p className="converted_text">Converted Nepali Text</p>
            </Col>
            <Col xl={8} md={8} xs={24} >
              <CopyToClipboard text={this.props.value}>
                <button onClick={openMessage} className="copy">
                  Copy to clipboard
                </button>
              </CopyToClipboard>
            </Col>
          </Row>

          <TextArea
            className="textarea-for-text"
            placeholder="Speech To Text Here"
            value={this.props.value}
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
}
