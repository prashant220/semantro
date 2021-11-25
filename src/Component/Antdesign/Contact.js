import React, { useState } from "react";
import Navigation from "../Navigation";
import { Row, Col ,Alert} from "antd";
import axios from "axios";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./css/uploadfile.css";
import Footer from "../Footer";
export default function Contact() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [query, setQuery] = useState(null);
  const [message, setMessage] = useState(null);
  const[sent,setSent]=useState(false)
  const[speechLoading,setSpeechLoading]=useState(false)
  const changeValue = (e) => {
    setName(e.target.value);
    console.log(e.target.value);
  };

  {
    var data = {
      "@context": "http://semantro.com/",
      "@type": "SayakMutation",
      actionName: "addCustomerQuery",

      data: {
        "@context": "http://semantro.com/",
        "@type": "User",
        name: name,
        email: email,
        alternateName: subject,
        description: query,
        disambiguatingDescription: message,
      },
    };
  }

  const bodyFormData = new FormData();
  bodyFormData.append("data", JSON.stringify(data));

  const valueChanged = (e) => {
    axios({
      method: "post",
      url: "http://103.198.9.169/saayak-web-interface/mutation",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });

    e.preventDefault();
    setEmail("")
    setMessage("")
    setQuery("")
    setSubject("")
    setName("")
    setSent(true)

  };
  
  const handleClose = () => {
    setSent(false);
  };

  return (
    <div className="contact">
      <Navigation />
      <Row>
        <Col xl={10} md={24} xs={24} style={{ marginTop: "5vh" }}>
          <h2 style={{ color: "#e6501e" }}>Contact us</h2>
          <p>Integrated ICT PVT.LTD./Semantro Pvt. Ltd.</p>
          <p>First Cross, Jwagal</p>
          <p>Lalitpur-10, Kupondole</p>
          <p>Lalitpur, Nepal</p>
          <p>
            <a href="tel:+977-01-5535522">+977-01-5535522</a>
          </p>
          <p>
            <a href="https://integratedict.com.np/i2ctwebsite/">
              info@integratedict.com.np
            </a>
          </p>
        </Col>
        <Col
          xl={12}
          md={24}
          xs={24}
          style={{
            marginTop: "5vh",
            boxShadow: "rgb(0 0 0 / 35%) 0px 5px 15px",
            padding: "40px",
          }}
        >
          <Form     onSubmit={valueChanged} >
            <h2 style={{color:'rgb(230, 80, 30)'}}>Send us a message</h2>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ color: "#e6501e" }}>
                Name*
              </Form.Label>
              <Col sm={18}>
                <Form.Control
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={changeValue}
                  id="validationCustom01"
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ color: "#e6501e" }}>
                Email*
              </Form.Label>
              <Col sm={18}>
                <Form.Control
                  type="email"
                  placeholder="email"
                  value={email}
                  id="validationCustom02"
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ color: "#e6501e" }}>
                Subject*
              </Form.Label>
              <Col sm={18}>
                <Form.Control
                  type="query"
                  placeholder="query"
                  id="validationCustom03"
                  required
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ color: "#e6501e" }}>
                Query*
              </Form.Label>
              <Col sm={18}>
                <Form.Control
                  type="query"
                  id="validationCustom04"
                  required
                  placeholder="query"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm={2} style={{ color: "#e6501e" }}>
                Message*
              </Form.Label>
              <Col sm={18}>
                <Form.Control
                  type="message"
                  id="validationCustom04"
                  required
                  placeholder="message"
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  type="submit"
                  htmlType="submit"
                  type="primary" 
                  style={{ backgroundColor: "#e6501e", border: "none" }}
                >
                  Send message
                </Button>
             <Row  style={{marginTop:'2vh'}}>
               <Col xl={6}></Col>
               <Col xl={8}>

               {sent ? (
        <Alert message="Your message has been sent" type="success" closable afterClose={handleClose}  id="alert"/>
      ) : null}
          
        
               </Col>
                 
                </Row>
                
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row style={{ marginTop: "5vh" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.058985844648!2d85.32063591453779!3d27.684571733100547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b798e074b1%3A0x4eaa9c1341f18c2a!2sIntegrated%20ICT%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1637140536947!5m2!1sen!2snp"
          width="100%"
          height="300"
          allowfullscreen=""
          loading="lazy"
        ></iframe>
      </Row>
      <Footer />
    </div>
  );
}
