

import React,{useEffect, useState}from 'react'
import { Tabs, Radio, Space } from 'antd';
import Uploadfile from './Uploadfile';
import Recordlive from './Recordlive.js'
import Footer from './Footer';
import "..//css/uploadfile.css";

function Selectfeature() {
  const { TabPane } = Tabs;
  const[tabPosition,setTabPosition]=useState(null)
  const handleResize=()=> {
    if (window.innerWidth >900) {
     setTabPosition('left')
    } else  if (window.innerWidth <900)  {
     setTabPosition('top')
    }
  }
  useEffect(()=>{
    handleResize()
  },[])
console.log(tabPosition)
  return (
    <div>
      
      <Tabs tabPosition={tabPosition} >
         <TabPane tab="Record audio" key="1" >
           
           <Recordlive/>
         </TabPane>
         <TabPane tab="Upload audio" key="2">
        <Uploadfile/>
       </TabPane>
         
       </Tabs>
        
   
       <Footer/>
    </div>
  )
}

export default Selectfeature
