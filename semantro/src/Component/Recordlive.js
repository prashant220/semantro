import React, { useState,useRef, useEffect } from "react";
import "../css/uploadfile.css";
import { Row, Col, Button, Input, Form, Card, Alert, Rate } from "antd";
import { r_getSpeechIntoText } from "./api.js";
import "antd/dist/antd.css";
import { useReactMediaRecorder } from "react-media-recorder";
import Converterbox from "./Converterbox";
import Rating from "./Rating";
import { Modal,Result, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { FaMicrophoneAlt } from "react-icons/fa";
import { Prompt } from "react-router-dom";
import {speech} from '../api/data'

function Recordlive(props) {
  const [speechToTextLoading, setSpeechToTextLoading] = useState(false);
  const [recordedAudioFile, setrecordedAudioFile] = useState(null);
  const [id, setId] = useState(null);
  const [speechText, setSpeechText] = useState(null);
  const [speechToTextSucess, setspeechToTextSucess] = useState(false);
  const [openMic, setOpenMic] = useState(false);
  const [record, setRecord] = useState("Record audio");
  const [play, setPlay] = useState(false);
  const [visible, setVisible] = useState(null);
  const [timer, setTimer] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const countRef = useRef(null)
var clock=0;
  
  const handleStart = () => {
    
  countRef.current = setInterval(() => {
   

    setTimer((timer) => timer + 1)
    
   
  
  }, 1000)
  }
  useEffect(()=>{
    if(timer==30){
   
    handleReset()
    stopRecording()
      setPlay(true)
      clearInterval(countRef.current)
    }
  

  })
  
  console.log(timer)
  console.log(clock)
    const handleReset = () => {
    
      clearInterval(countRef.current)
   
      setIsActive(false)
      setIsPaused(false)
      setTimer(0)
    

  }

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2)
    const minutes = `${Math.floor(timer / 60)}`
    const getMinutes = `0${minutes % 60}`.slice(-2)
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

    return ` ${getMinutes} : ${getSeconds}`
  }

  const { status, startRecording, stopRecording, blob, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: (blobUrl, blob) => setrecordedAudioFile(blob),
      startRecording: () => 
      setOpenMic(true),
    
     
    });

  
  console.log(openMic);
  console.log(mediaBlobUrl);
  console.log(blob);

  const file = new File([blob], "filename.mp3");
  console.log(file);
console.log(file.size)
 

  const handleSpeechToTextRequest = (audioFile) => {
    let endpoint = speech;
    let file = audioFile;
    setSpeechToTextLoading(true);
    // setVisible(true)
    // setTimeout(() => {setVisible(false)}, 3000)
 
   
    
    console.log(file, endpoint);
    r_getSpeechIntoText(audioFile, endpoint).then((res) => {
      console.log(res.data.transcription);
      if (res.data.status === "success") {
        setspeechToTextSucess(true);
        setVisible(true)
    setTimeout(() => {setVisible(false)}, 3000)
        setId(res.data.audio_id);
        setSpeechText(res.data.transcription);
        setSpeechToTextLoading(false);
        console.log(res.data.audio_id);
      } else if (res.data.status === "error") {
        setSpeechToTextLoading(false);
        console.log(res.data.status);
      }
    });
  };
  
 

  const handleRecordedAudioUpload = () => {
    setSpeechToTextLoading(false);

    handleSpeechToTextRequest(recordedAudioFile);
  };
  console.log(status);
  
  const { confirm } = Modal;
  function showConfirm() {
    confirm({
      title: "Are you sure you want to start a new recording?",
      icon: <ExclamationCircleOutlined />,
      content: "Your current recording will be deleted",
      onOk() {
        console.log("OK");
        setOpenMic(false);
        setPlay(false);
        setId(null);
        setSpeechText(null);
        setSpeechToTextLoading(false)
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }

 console.log(status)
 

  function changeFormat() {
   
     
      if (openMic == false && play == false) {
        return (
          
          <div class="row">
            <div className="row">
              <h1 className="record_audio">Record Audio</h1>
            </div>
            <div className="row">
           
              <p className="record_para">is your microphone ready?</p>
            </div>
            <div className="row">
              <Col></Col>
              <Col>
                <Button
                  onClick={() => {
                   handleStart()
                    startRecording();
                    setOpenMic(true);
                    setRecord("Recording...");
                    setspeechToTextSucess(false);
                    setIsChanged(true);
                
                
                  }}
                  style={{
                 
                    borderRadius: "8px",
                    border: "none",
                    padding:'26px 40px',
                    lineHeight:'0'
                  }}
                  className="start-button"
                  type="primary"
                  size="large"
                >
                  Start Recording
                </Button>
              </Col>

              <Col></Col>
            </div>
          </div>
        );
      }

      {
        if (openMic == true && status=="idle") {
          return (
            <div class="row">
              <div className="row">
                <p className="stop_text">Your mic is turned off..Please enable your mic from browser</p>
              </div>
             <Row>
               <Col xl={8} md={8} ></Col>
               <Col xs={24}>
               <Result
    status="404"
 
    subTitle="Sorry, your mic is disabled."
    extra={<Button type="primary"  style={{backgroundColor:"#cf481b" ,height:'43px',border:'none',   padding: "26px 40px",
    lineHeight: "0px",    borderRadius: "8px",}}
      onClick={() => {
      setOpenMic(false);
      setPlay(false);
      setId(null);
      setSpeechText(null);
    }}>Back Home</Button>}
  />

               </Col>
               <Col></Col>
          
             </Row>
            
          
            </div>
          );
        } 
        
 
      
        if (openMic == true && play == false) {
          return (
            <div class="row">
              <div className="row">
                <p className="stop_text">Speak now...{status}</p>
              </div>
         
              <div class="row mic">
                <div class="object">
                  <div class="outline"></div>
                  <div class="outline" id="delayed"></div>
                  <div class="button"></div>
                  <div class="button" id="circlein">
                    <FaMicrophoneAlt id="microphone" />
                  </div>
                </div>
              </div>
              <Row>
                <Col xl={9 } md={6} xs={6}></Col>
                <Col xl={5} md={11} xs={10}>
                  <p>Max duration<b> 30 seconds</b></p>
                <p id="counter" style={{fontSize:'30px'}}>{formatTime()}</p>
                </Col>
                <Col xl={8}></Col>
               
                </Row>

              <Row gutter={[16, 24]} style={{ paddingBottom: "10px" }}>
                <Col xl={6} md={0} xs={0}></Col>

                <Col xl={6} md={12} xs={24}>
                  <Button
                    onClick={() => {
                      stopRecording();
                        handleReset()
                         setPlay(true);  
                       
                    
                      setRecord("Record audio");
                    }}
                    className="stop-button"
                    type="primary"
                    size="large"
                    style={{
                      padding: "26px 40px",
                      lineHeight: "0px",
                      borderRadius: "8px",
                      border: "none",
                    }}
                  >
                    Stop
                  </Button>
                </Col>

                <Col xl={6} md={12} xs={24}>
                  <Button
                    onClick={() => {
                      showConfirm();
                     handleReset()
                 
                
                    }}
                    className="reset-button"
                    type="primary"
                    size="large"
                    style={{
                      padding: "26px 40px",
                      lineHeight: "0px",
                      borderRadius: "8px",
                      border: "none",
                      backgroundColor: "grey",
                    }}
                  >
                    Reset
                  </Button>
                </Col>
                <Col xl={6} md={0} xs={0}></Col>
              </Row>
            </div>
          );
        } 
        
 
         
          if (openMic == true && play == true) {
            return (
              <div className="row">
                <Row>
                  <p className="stop_text">Your recording</p>
                </Row>

                <Row style={{ marginBottom: "10vh", marginTop: "5vh" }}>
                  <Col xl={8} md={8} xs={6}></Col>
                  <Col xl={8}>
                    <audio src={mediaBlobUrl} controls loop type={true} />
                  </Col>
                  <Col></Col>
                </Row>
                <Row gutter={[16, 24]} style={{ marginBottom: "10px" }}>
                  <Col xl={6} md={0} xs={0}></Col>
                  <Col xl={6} md={12} xs={24}>
                    <Button
                      onClick={() => {
                        showConfirm();
                    handleReset()
                      
                      }}
                      className="reset_button"
                      type="primary"
                      size="large"
                      style={{
                        padding: "26px 40px",
                        lineHeight: "0px",
                        borderRadius: "8px",
                        border: "none",
                      }}
                    >
                      Reset
                    </Button>
                  </Col>
                  <Col xl={6} md={12} xs={24}>
                    <Button
                      type="primary"
                      size="large"
                      htmlType="submit"
                     
                     loading={speechToTextLoading} 
                     onClick={() => {
                      handleRecordedAudioUpload();
                      setIsChanged(false);
                 
                   
                
                    }}
                      style={{
                        padding: "26px 40px",
                        lineHeight: "0px",
                        borderRadius: "8px",
                        border: "none",
                        backgroundColor: "#cf481b",
                      }}
                    >
                      Convert
                    </Button>
                  </Col>
                  <Col xl={6} md={0} xs={0}></Col>
                </Row>
              </div>
            );
          }
        
        
        
      
        }

  }
  const [isChanged, setIsChanged] = useState(false);
  console.log(isChanged);

  return (
    <div>
      <Prompt
        when={isChanged}
        message={(location) =>
          `Are you sure you want to go to ${location.pathname}`
        }
      />
      <div className="site-card-border-less-wrapper">
        <Card>{changeFormat()}</Card>
        <Row>
          <Col span={24} className="speech-file-text-result-container">
            {visible&&speechText ? (
           
              <Alert message="Conversion Success" type="success" showIcon />
              
             
            ) : null}
          </Col>
        </Row>
      </div>
      <Converterbox value={speechText} />
      {speechText ? <Rating id={id} message={speechText} /> : <p></p>}
     {/* <Rating id={id} message={speechText} />  */}

   
    </div>
  );
}

export default Recordlive;
