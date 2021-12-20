import axios from 'axios'


export const r_getSpeechIntoText = (file, endpoint) => {

    return new Promise((resolve, reject) => {

    //create the request here 
    const requestFormat = {}


    //console.log(newhasDocument)
    const requestFormatWithUserData = {
        ...requestFormat
    }

    //console.log(requestFormatWithUserData)
    const reqD = new FormData();
    // reqD.append("data", JSON.stringify(requestFormatWithUserData));
    reqD.append("file", file)

    axios({
        method: "POST",
        url: endpoint,
        headers: {
          "Content-Type": "multipart/form-data",
          
          
        },
       
        
        data: reqD,
      
      })
      .then((res) => {
        const { data } = res;
        if (res.status === 200 && data) {
          resolve(res);
      }
      })
      .catch((error) => {
        console.log(error);
        // reject(error)
      });

    })//end of promise return 
};
