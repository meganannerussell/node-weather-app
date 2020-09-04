const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Andrew Mead",
  });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  // geocode data is lattitude, longitude, location
  try {
    const geocodeData = await geocode(req.query.address);
    //   res.send({
    //     test: geocodeData,
    //   });
    const forecastData = await forecast(
      geocodeData.lattitude,
      geocodeData.longitude
    );
    res.send({
      forecast: forecastData,
      location: geocodeData.location,
      address: req.query.address,
    });
  } catch (e) {
      res.send({
          error: e
      })
    // console.log(e);
  }

  //   geocode(
  //     req.query.address
  // async (error, { lattitude, longitude, location }) => {
  //   if (error) {
  //     return res.send({
  //       error,
  //     });
  //   }
  //   try {
  //     await forecast(lattitude, longitude);
  //     res.send({
  //       forecast: forecastData,
  //       location,
  //       address: req.query.address,
  //     });
  //   } catch (e) {
  //     return res.send(e);
  //   }
  // }
  //   );
  // console.log(req.query)
  // res.send({
  //     forecast: 'It is snowing',
  //     location: 'Philadelphia',
  //     address: req.query.address
  // })
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew Mead",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});