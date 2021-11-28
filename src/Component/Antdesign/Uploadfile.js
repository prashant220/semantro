import React, { Component } from "react";
import "./css/uploadfile.css";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { Row, Col, Button, Input, Form, Card, Alert, Rate } from "antd";
import { r_getSpeechIntoText } from "./api.js";
import "antd/dist/antd.css";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Converterbox from "../Converterbox";
import Rating from "../Rating";
import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Dragger } = Upload;
const { TextArea } = Input;
export default class Uploadfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speechText: "",
      speechToTextSuccess: false,
      speechToTextLoading: false,
      fileaudio: "",
      id: "",
    };
    this.showConfirm = this.showConfirm.bind(this);
  }

  handleSpeechToTextForm = (e) => {
    console.log(e);

    const audioFile = e.audioFile.file.originFileObj;
    this.handleSpeechToTextRequest(audioFile);
  };

  handleSpeechToTextRequest = (audioFile) => {
    let endpoint = "http://3.138.164.184:7000/speech/";

    this.setState({
      fileaudio: audioFile,
      speechToTextLoading: true,
      speechToTextSuccess: false,
    });

    console.log(this.state.fileaudio, endpoint);

    r_getSpeechIntoText(audioFile, endpoint).then((res) => {
      console.log(res.data.transcription);
      if (res.data.status === "success") {
        this.setState({
          speechToTextSuccess: true,
          speechText: res.data.transcription,
          id: res.data.audio_id,
          speechToTextLoading: false,
        });
        console.log(res.data.audio_id);
      } else if (res.data.status === "error") {
        this.setState({
          speechToTextLoading: false,
        });
      }
    });
  };

  showConfirm = () => {
    const { confirm } = Modal;

    confirm({
      title: "Are you sure you want to start a new recording?",
      icon: <ExclamationCircleOutlined />,
      content: "Your current recording will be deleted",
      onOk: () => {
        console.log("OK");
        this.setState({
          fileaudio: "",
          id: "",
          speechText: "",
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  render() {
    const uploaderProps = {
      name: "file",
      multiple: false,
      action: "",
      maxCount: 1,
      customRequest: this.dummyRequest,
      onChange: this.handleFileUploadChange,
      beforeUpload: this.beforeUpload,
    };
    const { recordState } = this.state;
    return (
      <div>
        <div className="site-card-border-less-wrapper">
          <Card
            title="Upload or drag audio file"
            style={{ width: "97%" }}
          >
          
            <Form
              name="uploadAudioFileForm"
              onFinish={this.handleSpeechToTextForm}
              layout="vertical"
            >
              <Form.Item
                name="audioFile"
                rules={[
                  { required: true, message: "Please select audio file!" },
                ]}
              >
                <Dragger {...uploaderProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                </Dragger>
              </Form.Item>

              {!this.state.speechText ? (
                <Row>
                  <Col xl={7} md={7} xs={3} ></Col>
                  <Col xl={10} md={10} xs={18} >
                  <Button
                  htmlType="submit"
                  loading={this.state.speechToTextLoading}
                  type="primary"
                  style={{
                    padding: "26px 40px",
                    lineHeight: "0px",
                    borderRadius: "8px",
                    border: "none",
      
                    backgroundColor: " #e6501e",
                    marginBottom:'4vh'
                  }}
                >
                  Convert to text
                </Button>

                  </Col>
                  <Col xl={8}></Col>
                  
             
                </Row>
              ) : (
                <Button
                  onClick={this.showConfirm}
                  className="resetfile_button"
                  type="primary"
                
                >
                  Reset
                </Button>
              )}

          
              {/* {
                this.state.speechToTextSuccess?(
                  <Row>
                  <Col span={24 } className="speech-file-text-result-container">
                
                          <Alert
                            message="Conversion Success"
                            type="success"
                            style={{  marginTop:'3%',marginLeft:'40%'}}
                            showIcon/>
                       
                      
                        
                       
                   </Col>
                  
                   </Row>
                ):null
              }
            */}
          
         
              
            </Form>
            
          </Card>
          {
            this.state.speechToTextSuccess?

            <Row>
            <Col span={24 } className="speech-file-text-result-container">
          
                    <Alert
                      message="Conversion Success"
                      type="success"
                   
                      showIcon/>
                 
                
                  
                 
             </Col>
            
             </Row>:null
    

          }
   
        </div>

        <Converterbox value={this.state.speechText} />
        {this.state.speechText ? (
          <Rating id={this.state.id} message={this.state.speechText} />
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}
