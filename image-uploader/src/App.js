import React, { useRef } from "react";
import "./App.css";
import "../../../image-uploader/image.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import DropDrag from "./DropDrag";
import handleFiles from "./DropDrag";

function App() {
  const fileInputRef = useRef();
  // const uploadFiles = () => {
  //   fileInputRef.current.click();
  // };

  const fileSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files);
    }
  };

  const fileInputClicked = () => {
    fileInputRef.current.click();
  };

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
        <input type="hidden" multiple onChange={fileSelected} />
        <button className="btn btn-primary" onClick={fileInputClicked}>
          Choose a file
        </button>
        <input
          ref={fileInputRef}
          className="file-input"
          type="file"
          multiple
          onChange={fileSelected}
        />
      </div>
    </div>
  );
}

export default App;
