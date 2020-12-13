import React, { useState, useEffect, useRef } from 'react'
import './DragDrop.css'

import Background from './Background'

const DragDrop = () => {
  const fileInputRef = useRef()
  const modalImageRef = useRef()
  const modalRef = useRef()
  const progressRef = useRef()
  const uploadRef = useRef()
  const uploadModalRef = useRef()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [validFiles, setValidFiles] = useState([])
  const [unsupportedFiles, setUnsupportedFiles] = useState([])

  useEffect(() => {
    let filteredArray = selectedFiles.reduce((file, current) => {
      const x = file.find((item) => item.name === current.name)
      if (!x) {
        return file.concat([current])
      } else {
        return file
      }
    }, [])
    setValidFiles([...filteredArray])
  }, [selectedFiles])

  const dragOver = (e) => {
    e.preventDefault()
  }

  const dragEnter = (e) => {
    e.preventDefault()
  }

  const dragLeave = (e) => {
    e.preventDefault()
  }

  const fileDrop = (e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    console.log(files)
    if (files.length) {
      handleFiles(files)
    }
  }

  const fileSelected = () => {
    if (fileInputRef.current.files.length) {
      handleFiles(fileInputRef.current.files)
    }
  }

  const fileInputClicked = () => {
    fileInputRef.current.click()
  }

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        // add to an array to display the name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]])
      } else {
        // add a new property called invalid
        files[i]['invalid'] = true
        // add to the same array to display name of the file
        setSelectedFiles((prevArray) => [...prevArray, files[i]])
        //set error message
        setErrorMessage('File type not permitted')

        setUnsupportedFiles((prevArray) => [...prevArray, files[i]])
      }
    }
  }

  const validateFile = (file) => {
    const validTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/x-icon',
    ]
    if (validTypes.indexOf(file.type) === -1) {
      return false
    }
    return true
  }

  const fileSize = (size) => {
    if (size === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['bytes', 'kb', 'mb', 'gb', 'tb']
    const i = Math.floor(Math.log(size) / Math.log(k))
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const fileType = (fileName) => {
    return (
      fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length) ||
      fileName
    )
  }

  const removeFile = (name) => {
    // find the index of the item
    // remove the item from array

    const validFileIndex = validFiles.findIndex((e) => e.name === name)
    validFiles.splice(validFileIndex, 1)
    // update validFiles array
    setValidFiles([...validFiles])
    const selectedFileIndex = selectedFiles.findIndex((e) => e.name === name)
    selectedFiles.splice(selectedFileIndex, 1)
    // update selectedFiles array
    setSelectedFiles([...selectedFiles])

    // Each invalid file dropped by the user will be added to the array
    const unsupportedFileIndex = unsupportedFiles.findIndex(
      (e) => e.name === name
    )
    if (unsupportedFileIndex !== -1) {
      unsupportedFiles.splice(unsupportedFileIndex, 1)
      // update unsupportedFiles array
      setUnsupportedFiles([...unsupportedFiles])
    }
  }

  const openImageModal = (file) => {
    const reader = new FileReader()
    modalRef.current.style.display = 'block'
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      modalImageRef.current.style.backgroundImage = `url(${e.target.results})`
    }
  }

  const closeModal = () => {
    modalRef.current.style.display = 'none'
    modalImageRef.current.style.backgroundImage = 'none'
  }

  const uploadFiles = async () => {
    uploadModalRef.current.style.display = 'block'
    uploadRef.current.innerHTML = 'File(s) Uploading...'
    for (let i = 0; i < validFiles.length; i++) {
      const formData = new FormData()
      formData.append('image', validFiles[i])
      formData.append('key', '')

      axios.post('https://api.imgbb.com/1/upload', formData, {
        onUploadProgress: (ProgressEvent) => {
          const uploadPercentage = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          )
          progressRef.current.innerHTML = `${uploadPercentage}%`
        },
      })
    }
  }

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
  )
}

export default DragDrop
