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
import { Prompt } from "react-router-dom";
import {speech} from '../../api/data'

const { Dragger } = Upload;
const { TextArea } = Input;

export default class Uploadfile extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
  
      speechText: "",
      speechToTextSuccess: false,
      speechToTextLoading: false,
      fileaudio: null,
      id: "",
      disable:true,
      visible:false,
      isChanged:false,
      large:false,
    
    };
    this.showConfirm = this.showConfirm.bind(this);
    
  
  }

  handleSpeechToTextForm = (e) => {
    console.log(e);

    const audioFile = e.audioFile.file.originFileObj;
  
    this.handleSpeechToTextRequest(audioFile);
   this.beforeUpload(audioFile)

 
  }
  handleFileUploadChange=(audioFile)=>{
    
    this.setState({disable: false});
  
 

  }
   beforeUpload=(audioFile)=> {
   console.log(audioFile)
   console.log(audioFile.type)
   if(audioFile.type=="audio/mpeg"&&audioFile.size>7000000||audioFile.type=="audio/wav"&&audioFile.size>2000000 ){
    console.log("greater")
    this.setState({
      large:true
    })

    }
    else{
      this.setState({
        large:false
      })
      console.log("smaller")
    }
   }
 
  


  handleSpeechToTextRequest = (audioFile) => {
    let endpoint =speech;

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
          fileaudio:audioFile,
          disabled:false,
          visible:true,

        });
        setTimeout(()=>{
          this.setState({
            visible:false
          })
        },3000)
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
      content: "Click to destroy all",
    
      onOk: () => {
        console.log("OK");
        
        this.setState({
         fileaudio:null,
          id: "",
          speechText: "",
          disable:true,
        });
        this.formRef.current.resetFields();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
    
   
  };
  active = (e) => {
    this.setState({disable: false});

    
   
   
  }

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
    
  
    return (
      <div>
         <Prompt
        when={this.state.isChanged}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
        <div className="site-card-border-less-wrapper">
          <Card title="Upload or drag audio file" style={{ width: "97%" }}>
            <Form
            ref={this.formRef}
              name="uploadAudioFileForm"
              onFinish={this.handleSpeechToTextForm}
              layout="vertical"
              // onChange={this.active}
          onChange={this.handleFileUploadChange}
              
              
             


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
           {
             this.state.large?     <Row style={{marginBottom:'5px'}}>
             <Col xl={8} md={9} xs={5}></Col>
             <Col xl={8} >
             <Alert message="File size too large" type="warning" showIcon closable />
             </Col>
             <Col xl={8}></Col>
           </Row>:null
           }
           
              
        
              {!this.state.speechText?  (
                <Row>
                  <Col xl={7} md={7} xs={3}></Col>
                  <Col xl={10} md={10} xs={18}>
                    <Button
                      htmlType="submit"
                      onClick={()=>
                      this.setState({
                        isChanged:true
                      })
                      
                      }
                      loading={this.state.speechToTextLoading}
                      type="primary"
                   
                      disabled={this.state.disable}
                  
                      style={{
                        padding: "26px 40px",
                        lineHeight: "0px",
                        borderRadius: "8px",
                        border: "none",
                      backgroundColor:this.state.disable || this.state.large?'#babcbf':"#e6501e",
                      color:this.state.disable?"white":null,
                   
                        marginBottom: "4vh",
                      }}
                    >
                      Convert to text
                    </Button>
                  </Col>
                  <Col xl={8}></Col>
                </Row>
              ) : (
                
                <Button
                style={{
                  padding: "26px 60px",
                  lineHeight: "0px",
                  borderRadius: "8px",
                  border: "none",
                  marginBottom: "4vh",
                  backgroundColor:'grey'
                }}
           
                
                  onClick={()=>this.showConfirm()
               
                          
                  
                  
                  }

         
                  type="primary"
                >
                  Reset
                </Button>
             
              )}
        
            </Form>
          </Card>
          {this.state.visible ? (
            <Row>
              <Col span={24} className="speech-file-text-result-container">
                <Alert message="Conversion Success" type="success" showIcon  />
              </Col>
            </Row>
          ) : null}
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
