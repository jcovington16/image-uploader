import React, { useState } from "react";
import Background from "./Background";
import "../../../image-uploader/image.svg";

function DropDrag() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

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
      handlesFiles(files);
    }
  };

  const handlesFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array so we can display the name of the file
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array to display name of file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage("File type not permitted");
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
      "text/doc",
      "text/docx",
      "text/txt",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div
        className="drop__container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <Background />
        <div className="drop__display">
          <div className="drop__status">
            <div>
              <div className="drop__filelogo"></div>
              <div className="drop__filetype">png</div>
              <span className="drop__filename">test-file.png</span>
              <span className="drop__filesize">(20.5 KB)</span>{" "}
              {
                <span className="drop__fileError">
                  (File type not permitted)
                </span>
              }
            </div>
            <div className="drop__fileremove">X</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropDrag;
