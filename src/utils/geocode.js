const request = require("request");

// const geocode = (address, callback) => {
//   const url =
//     "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//     encodeURIComponent(address) +
//     ".json?access_token=pk.eyJ1IjoibWVnYW5hbm5lcnVzc2VsbCIsImEiOiJja2VqbmJvM3QwdzBnMnpvNjNldGN2Y3JzIn0.OjvEmVG1j81uAqyBZt9qnQ";

//   request({ url, json: true }, (error, { body }) => {
//     if (error) {
//       callback("unable to connect", undefined);
//     } else if (body.features.length === 0) {
//       callback("unable to find location", undefined);
//     } else {
//       callback(undefined, {
//         lattitude: body.features[0].center[1],
//         longitude: body.features[0].center[0],
//         location: body.features[0].place_name,
//       });
//     }
//   });
// };

// module.exports = geocode;

// geocode(address, async (error, {lattitude, longitude, location}={})=> {
//   if(error) {
//     return console.log(error)
//   }
//   try {
//     const result = await forecast(lattitude, longitude)
//     // console.log(result)
//     console.log(location)
//     console.log(result)
//   } catch (e) {
//     console.log(e)
//   }
//   console.log(data.location)
//   console.log(result)

// })

const geocode = (address) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWVnYW5hbm5lcnVzc2VsbCIsImEiOiJja2VqbmJvM3QwdzBnMnpvNjNldGN2Y3JzIn0.OjvEmVG1j81uAqyBZt9qnQ";

  console.log(url);

  // return url

  const promise = new Promise((resolve, reject) => {
    request({ url, json: true }, (error, { body }) => {
      if (error) {
        reject("Unable to connect");
      } else if (body.features.length === 0) {
        reject("unable to find location");
      } else {
        resolve({
          lattitude: body.features[0].center[0],
          longitude: body.features[0].center[1],
          location: body.features[0].place_name,
        });
      }
    });
  });

  return promise;

  // const promise = new Promise((resolve, reject) => {
  //   request({ url, json: true }, (error, { body }) => {
  //     if (error) {
  //       reject("Unable to connect to weather service!", undefined);
  //     } else if (body.error) {
  //       reject("Unable to find location", undefined);
  //     } else {
  //       resolve(
  //         body.current.weather_descriptions[0] +
  //           " It is currently " +
  //           body.current.temperature +
  //           " degrees out. It feels like " +
  //           body.current.feelslike
  //       );
  //     }
  //   });
  // });

  // return promise;

  // const promise = new Promise ((resolve, reject)=>{
  //   request({url, json:true}, (error, {body})=>{
  //     if (error) {
  //       reject("unable to connect", undefined);
  //     } else if (body.features.length === 0) {
  //       reject("unable to find location", undefined);
  //     } else {
  //       resolve(undefined, {
  //         lattitude: body.features[0].center[1],
  //         longitude: body.features[0].center[0],
  //         location: body.features[0].place_name,
  //       });
  //     }

  //   })
  // })
  // return promise
};

// try {await geocode(address)}
// catch(e){console.log(e)}

module.exports = geocode;
