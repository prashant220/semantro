import React from "react";
import "../css/body.css";
import { Steps } from "antd";
import {
  AudioOutlined,
  CloudUploadOutlined,
  FileSyncOutlined, 
  SmileOutlined,
} from "@ant-design/icons";

export default function Body() {
  const { Step } = Steps;
  return (
    <div>
      <p
        className="upper-text"
        style={{ marginLeft: "12%", fontSize: "25px", marginTop: "31px" }}
      >
        {" "}
        Nepali Speech To Text{" "}
      </p>
      <Steps>
        <Step title="Record" icon={<AudioOutlined />} />
        <Step title="Upload" icon={<CloudUploadOutlined />} />
        <Step title="Convert" icon={<FileSyncOutlined />} />
      </Steps>
    </div>
  );
}
