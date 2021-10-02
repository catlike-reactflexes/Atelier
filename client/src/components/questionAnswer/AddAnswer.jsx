const React = require('react');
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import PhotoUpload from './PhotoUpload.jsx';

class AddAnswer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      answer: '',
      nickname:'',
      email:'',
      previewImages:[],
      photos:[]
    }
    this.submitAnswer= this.submitAnswer.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);

    console.log('Add Answer-props->', this.props)
  }
  setOpen = (option) => {

    this.setState({
      isOpen: option
    })
  }
  uploadPhotos = (imageData, previewData) => {
    // this.props.postTrackInteractions('Add answer', 'Questions and Answers');
    console.log('imageData--3-->', imageData);
    // console.log('click upload name', data.name);

    this.setState({
      previewImages: previewData,
      photos: imageData
    })
  }
  submitAnswer = ()=> {
    this.props.postTrackInteractions('Submit answer', 'Questions and Answers');
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const formData = new FormData();
    if(this.state.photos.length > 0) {
      for(let i =0; i < this.state.photos.length; i++) {
        formData.append('images', this.state.photos[i],this.state.photos[i].name)
      }
    } 
    formData.append('question_id', this.props.oneQues.question_id)
    formData.append('body', this.state.answer)
    formData.append('name', this.state.nickname)
    formData.append('email', this.state.email)
    console.log('submit answer', this.state.photos);
    // console.log(this.state)
    // axios.post('/api/addAnswer', {
    //   question_id: this.props.oneQues.question_id,
    //   body: this.state.answer,
    //   name: this.state.nickname,
    //   email: this.state.email,
    //   photos: formData
    // })

    axios.post('/api/addAnswer', formData, config)
      .then(function(reponse){
        console.log('Success Creating the Answer-->',response);
      })
      .catch(function (error) {
        console.log('Error sending to server->', error.data)
      })

    this.props.onClose();
  }
  handleAnswerChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })

  }

  render(){
    if(!this.props.open) return null;
    //product name, product body
    const {question_body} = this.props.oneQues;
    const {productName} = this.props;

    //The modal should be titled “Submit your Answer”.  The modal should be subtitled:   “[Product Name]: [Question Body]”
    return (
      <div className="modal-addAnswer">
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
      <div className="modal-header">
          <h3>Submit your Answer</h3>
          <span onClick={()=>this.props.onClose()}>X</span>
      </div>
      <div className="modal-content">
          <p className="modal-product">{productName}  :  {question_body} </p>
          <div className="modal-body">
            <div>
              <label className="answer">Your Answer (mandatory</label>
                <textarea
                    data-testid="answer"
                    id="answer"
                    onChange={this.handleAnswerChange}
                    row={5}
                />
            </div>
            <div>
              <label className="nickname">nickname (mandatory) </label>
                <input
                  data-testid="nickname"
                  type="text"
                  id="nickname"
                  onChange={this.handleAnswerChange}
                  placeholder='Example: jackson543'/>

            </div>
            <div>
              <label className="email">email (mandatory)</label>
                <input
                  data-testid="email"
                  type="text"
                  id="email"
                  onChange={this.handleAnswerChange}
                  placeholder = 'jack@email.com'/>
            </div>

            {
          this.state.previewImages.length > 0 ?
          <div className="upload-images">{this.state.previewImages.map((preview, index)=>
            (<img className="thumbnail" key={index} src={preview} alt="🧐"/>))}
          </div> : null


        }
        <button className="btn-upload-image"onClick={()=> this.setOpen(true)}>Upload Photos (5 max)</button>

                {
                  this.state.isOpen ?
                  <PhotoUpload
                    open ={this.state.isOpen}
                    onClose={() => this.setOpen(false)}
                    uploadPhotos={this.uploadPhotos}
                  />

                  : null
                }

          </div>
      </div>



        <div className="modal-footer">
          <button onClick={this.submitAnswer}>Submit Answer</button>
        </div>

      </div>
      </div>
    );
  }
}
const MODAL_Q_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  zIndex: 1000
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .8)',
  zIndex: 1000
}
export default ClickTracker(AddAnswer);