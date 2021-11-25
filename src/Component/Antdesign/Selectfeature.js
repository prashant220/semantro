// import { Tabs, Radio, Space } from 'antd';
// import React, { Component } from 'react'
// import Uploadfile from './Uploadfile';
// import Recordlive from './Recordlive.js'
// import Footer from '../Footer';
// import "./css/uploadfile.css";
// const { TabPane } = Tabs;

// class Selectfeature extends React.Component {
//   state = {
//     tabPosition: '',
//   };

//   changeTabPosition = e => {
//     this.setState({ tabPosition: e.target.value });
//   };


//   render() {
//     function handleResize() {
//       if (window.innerWidth > 900) {
//         this.setState({ tabPosition: 'left' });
//       } else {
//         this.setState({ tabPosition: 'top' });
//       }
//     }
//  console.log(this.state.tabPosition)
//     const { tabPosition } = this.state;
    
//     return (
//       <>
       

//         <Tabs tabPosition={handleResize} >
//           <TabPane tab="Record audio" key="1" >
           
//             <Recordlive/>
//           </TabPane>
//           <TabPane tab="Upload audio" key="2">
//           <Uploadfile/>
//           </TabPane>
         
//         </Tabs>
        
   
//        <Footer/>
//       </>
//     );
//   }
// }
// export default Selectfeatures

import React,{useEffect, useState}from 'react'
import { Tabs, Radio, Space } from 'antd';
import Uploadfile from './Uploadfile';
import Recordlive from './Recordlive.js'
import Footer from '../Footer';
import "./css/uploadfile.css";

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
