'use strict';

const axios = require('axios');
const https = require('https');

module.exports.handle = async event => {    
  const pushDataEndpoint = process.env.PUSHDATA_ENDPOINT

  const agent = new https.Agent({
    rejectUnauthorized: false
  });

  try {
    const responce = await axios.post(
      pushDataEndpoint, 
      event.body,
      { 
        httpsAgent: agent,
        headers: event.headers 
      } 
    );

    return{
      statusCode: 200,
      body: JSON.stringify({
        response: responce,
        event: event
      }, null, 2)
    };       

  } catch (error) {
    let errResponse = {}

    if (error.response) {      
      errResponse= {
        data: error.response.data ,
        status:error.response.status,
        headers: error.response.headers
      }
    } else if (error.request) {
      errResponse= {request: error.request}      
    } else {
      errResponse= {message: error.message}
    }

    return {
      statusCode: 500,
      body: JSON.stringify({      
        errResponse: errResponse,
        event: event
      }, null, 2)
    };      
  }
  
}


module.exports.hello = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Hello :)'
      },
      null,
      2
    ),
  };
};
