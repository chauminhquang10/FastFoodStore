import React from "react";

import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./GlobalState";

import Header from "./components/headers/Header";

import Pages from "./components/main_pages/Pages";

import Footer from "./components/footer/Footer";

import BackToTopBtn from "./components/Back-To-Top-Button/BackToTopBtn";

import ShopGoogleMap from "./GoogleMap";

// import Messenger from "./components/Messenger/Messenger";

function App() {
  return (
    <>
      <DataProvider>
        <Router>
          <div className="App">
            <Header></Header>
            <Pages></Pages>
            <BackToTopBtn></BackToTopBtn>
            {/* <Messenger></Messenger> */}
            <Footer></Footer>
          </div>
        </Router>
      </DataProvider>
    </>
  );
}

export default App;
