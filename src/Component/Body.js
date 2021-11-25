import React from "react";
import "../css/body.css";
import { Row, Col } from "antd";

export default function Body() {
  return (
    <div className="box">
      <Row>
        <p
          className="upper-text"
          style={{
            fontSize: "53px",
            margin: "auto",
            display: "block",
            textShadow: " 2px 2px #rgb(70, 65, 65) ",
          
         
          }}
        >
          Semantro
        </p>
      </Row>
      <Row>
        <p
          style={{
            fontSize: "20px",
            margin: "auto",
            display: "block",
            marginTop: "5vh",
        
         
          }}
        >
          Neplai speech to text translator
        </p>
      </Row>
    </div>
  );
}
