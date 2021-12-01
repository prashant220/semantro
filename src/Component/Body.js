import React from "react";
import "../css/body.css";
import { Steps } from 'antd';
import {AudioOutlined ,CloudUploadOutlined,  FileSyncOutlined , SmileOutlined } from '@ant-design/icons';

export default function Body() {
  const { Step } = Steps;
  return (
    <div >
     
      <p className="upper-text" style={{marginLeft:'14%',fontSize:'43px',marginTop:'31px'}}> Nepali Speech To Text </p>
      <Steps>
    <Step status="finish" title="Record" icon={<AudioOutlined />} />
    <Step status="finish" title="Upload" icon={<CloudUploadOutlined />} />
    <Step status="process" title="Convert" icon={ <FileSyncOutlined />} />
    
  </Steps>
    </div>
  );
}
