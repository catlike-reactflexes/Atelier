import React from 'react';
import { IconName } from "react-icons/fa";

class PhotoUpload extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      picturePreview: [],
      progress: 0,
      selectedFile: [],
      urls:[]
    }

    this.uploadHandler = this.uploadHandler.bind(this);
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.closePreview = this.closePreview.bind(this);

    console.log('PhotoUpload--props->', this.props)
  }

  closePreview = (index) => {
    console.log('close Preview*********', index)
    let tempepreviewList = this.state.picturePreview;
    let tempselectedFile = this.state.selectedFile;
    tempepreviewList[index] = null;
    tempselectedFile[index] = null;
    let newTempPreviewList=[];
    let newTempSelectedListed = [];
    for(let i=0; i< this.state.picturePreview.length; i++){
      if(tempepreviewList[i] && tempselectedFile[i]){
        newTempPreviewList.push(tempepreviewList[i])
        newTempSelectedListed.push(tempselectedFile[i])
      }
    }
    this.setState({
      picturePreview: newTempPreviewList,
      selectedFile: newTempSelectedListed
    })
  }

  fileSelectedHandler = (e) => {
    // console.log('File selected->', typeof(e.target.files));
    // console.log('length--->', e.target.files.length);
    //check if there is more than 5 images
    let imageCount = e.target.files.length;
    if(imageCount > 5 && this.state.selectedFile.length > 5){
      imageCount = 5
    }
    let tempImageList = [];
    let tempImageUrl = [];
    for(let i =0; i < imageCount; i++){
      tempImageList.push(e.target.files[i]);
      tempImageUrl.push(URL.createObjectURL(e.target.files[i]))
    }
    // console.log('File temp list ->', tempImageList)
    // picturePreview: [...this.state.picturePreview, URL.createObjectURL(e.target.files)]
      this.setState({
        selectedFile: [...this.state.selectedFile, ...tempImageList],
        picturePreview: [...this.state.picturePreview, ...tempImageUrl]

    }, ()=> console.log('checking State for preview---1--->', this.state.picturePreview))

    // console.log('checking State for preview- 3--->', this.state.selectedFile)

  }
  uploadHandler = () => {
    console.log('checking selectedFile-->', this.state.selectedFile);
    const imageCount = this.state.selectedFile[0].length;
    console.log('imageCount-->', imageCount)
    this.props.uploadPhotos(this.state.selectedFile, this.state.picturePreview)
    this.props.onClose();
  }

  render() {

    return (
      <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
        <div className="modal-header">
        <h3>Maximum of 5 pictures</h3>
          <span onClick={()=>this.props.onClose()}>X</span>
      </div>


        <input type='file'  multiple onChange={this.fileSelectedHandler}></input>
        {
          this.state.picturePreview.length > 0  &&
          <div className="upload-images">
            {
              this.state.picturePreview.map((preview, index) => {
                return (
                  <div key={index}>
                    <img className="thumbnail" src={preview} alt="🧐"
                      onClick={()=> this.closePreview(index)}
                    />
                  </div>
                )
              })
            }
          </div>

        }

        {
          this.state.picturePreview.length > 5 ? <h2>You are so very helpful. Our server allows 5 images at this time.
            Please click on the picture to remove</h2> :
          <button onClick={this.uploadHandler}>Upload</button>
        }
      </div>
      </>

    )
  }

}
const MODAL_Q_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor:'#ECECEC',
  zIndex: 1000
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000
}
export default PhotoUpload;