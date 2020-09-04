const request = require("request");

const forecast = (latitude, longitude) => {
  const url =
    "http://api.weatherstack.com/current?access_key=7796b8671198c9dd364737db17bb441b&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

    console.log(url)

  const promise = new Promise((resolve, reject)=>{
    request({url, json:true}, (error, response)=> {
      if(error){
        reject('Could not connect')
      } else if (response.body.error){
        reject('Could not find location')
      } else {
        resolve({
          temperature: ` It is currently ${response.body.current.temperature} degrees out but it feels like ${response.body.current.feelslike}`
        })
      }

    })
  })
  return promise
};

module.exports = forecast;
