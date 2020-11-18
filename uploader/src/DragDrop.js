import React from "react";
import "../../../image-uploader/image.svg";
import Background from "./Background";

const DragDrop = () => {
  return (
    <div className="main__container">
      <div className="drop__header">Upload your image</div>
      <div className="drop__second-header">File should be Jpeg, Png...</div>
      <div className="drop__container">
        <Background />
        <div className="drop__bottom">Drag & Drop your image here</div>
      </div>
      <div className="drop__second-bottom">Or</div>
      <div className="drop__footer">choose a file</div>
    </div>
  );
};

export default DragDrop;
