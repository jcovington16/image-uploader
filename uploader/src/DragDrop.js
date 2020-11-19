import React from "react";
import "./DragDrop.css";

import Background from "./Background";

const DragDrop = () => {
  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array to display the name of the file
      } else {
        // add a new property called invalid
        // add to the same array to display name of the file
        //set error message
      }
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };
  return (
    <div
      className="main__container"
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <div className="drop__header">Upload your image</div>
      <div className="drop__second-header">File should be Jpeg, Png...</div>
      <div className="drop__container">
        <div className="drop__image">
          <Background />
        </div>
        <div className="drop__bottom-text">Drag & Drop your image here</div>
      </div>
      <div className="drop__bottom">Or</div>
      <div className="drop__footer">choose a file</div>
    </div>
  );
};

export default DragDrop;
