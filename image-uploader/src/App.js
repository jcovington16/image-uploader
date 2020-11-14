import React from "react";
import "./App.css";
import "../../../image-uploader/image.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import DropDrag from "./DropDrag";

function App() {
  const uploadFiles = () => {};

  return (
    // BEM

    <div className="App">
      <div className="main__header">
        <h4>Upload your image</h4>
      </div>
      <div className="second__header">File should be Jpeg, Png...</div>
      <div className="background__box">
        <div className="background__image">
          <DropDrag />
        </div>
        <div className="background__image__text">
          Drag & Drop your image here
        </div>
      </div>

      <div className="main__footer">Or</div>
      <div className="footer__button">
        <button className="btn btn-primary" onClick={uploadFiles}>
          Choose a file
        </button>
      </div>
    </div>
  );
}

export default App;
