import React, { useState, useEffect } from "react";
import Background from "./Background";
import "../../../image-uploader/image.svg";

export default function DropDrag() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [validFiles, setValidFiles] = useState([]);
  // const modalImageRef = useRef();
  // const modalRef = useRef();
  const [unsupportedFiles, setUnsupportedFiles] = useState([]);

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name);
      if (!x) {
        return file.concat([current]);
      } else {
        return file;
      }
    }, []);
    setValidFiles([...filteredArray]);
  }, [selectedFiles]);

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
        // add to an array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
      } else {
        // add a new property called invalid
        files[i]["invalid"] = true;
        // add to the same array so we can display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // set error message
        setErrorMessage("File type not permitted");

        setUnsupportedFiles((prevArray) => [...prevArray, files[i]]);
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

  const fileSize = (size) => {
    if (size === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf(".") + 1, fileName.length) ||
      fileName
    );
  };

  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name);
    validFiles.splice(validFileIndex, 1);
    // update validFiles array
    setValidFiles([...validFiles]);
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name);
    selectedFiles.splice(selectedFileIndex, 1);
    // update selectedFiles array
    setSelectedFiles([...selectedFiles]);

    // Each invalid file dropped by the user will be added to the array
    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e) => e.name === name
    );
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1);
      // update unsupportedFiles array
      setUnsupportedFiles([...unsupportedFiles]);
    }
  };

  // const openImageModal = (file) => {
  //   const reader = new FileReader();
  //   // Allows web app to asynchronously read the contents of files
  //   modalRef.current.style.display = "block";
  //   // Need a way to read the content of the file using readAsDataUrl
  //   reader.readAsDataURL(file);
  //   reader.onload = function (e) {
  //     modalImageRef.current.style.backgroundImage = `url(${e.target.result})`;
  //   };
  // };

  // const uploadFiles = () => {};

  return (
    <div className="container">
      {/* {unsupportedFiles.length === 0 && validFiles.length ? (
        <button className="file-upload-btn" onClick={() => uploadFiles()}>
          Upload Files
        </button>
      ) : (
        ""
      )} */}
      {unsupportedFiles.length ? (
        <p>Please remove all unsupported files.</p>
      ) : (
        ""
      )}
      <div
        className="drop__container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
      >
        <Background />
      </div>
      <div className="drop__display">
        {validFiles.map((data, i) => (
          <div className="drop__status" key={i}>
            <div className="drop__filetype">{fileType(data.name)}</div>
            <span
              className={`drop__filename ${
                data.invalid ? "drop__fileError" : ""
              }`}
            >
              {data.name}
            </span>
            <span className="drop__filesize">{fileSize(data.size)}</span>
            {data.invalid && (
              <span className="drop__fileErrorMessage">{errorMessage}</span>
            )}
            <div
              className="drop__fileremove"
              onClick={() => removeFile(data.name)}
            >
              x
            </div>
          </div>
        ))}
      </div>
      {/* <div className="drop__modal" ref={modalRef}>
        <div className="drop__overlay"></div>
        <div className="drop__modalImage" ref={modalImageRef}></div>
      </div> */}
    </div>
  );
}

// export default DropDrag;
