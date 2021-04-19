import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./GlobalState";

import Header from "./components/headers/Header";

import Pages from "./components/main_pages/Pages";

import Footer from "./components/footer/Footer";

import BackToTopBtn from "./components/Back-To-Top-Button/BackToTopBtn";

// import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

// function Map() {
//   return (
//     <GoogleMap
//       defaultZoom={10}
//       defaultCenter={{ lat: 10.823099, lng: 106.629662 }}
//     ></GoogleMap>
//   );
// }

// const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="App">
            <Header></Header>
            <Pages></Pages>
            <BackToTopBtn></BackToTopBtn>
            <Footer></Footer>
          </div>
        </Router>
      </DataProvider>
      {/* <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        ></WrappedMap>
      </div> */}
    </>
  );
}

export default App;
