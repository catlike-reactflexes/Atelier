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
      answerEmpty:true,
      nickname:'',
      nicknameEmpty:true,
      email:'',
      emailEmpty:true,
      emailValid:true,
      validationInfo: false,
      previewImages:[],
      photos:[]
    }
    this.submitAnswer= this.submitAnswer.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.uploadPhotos = this.uploadPhotos.bind(this);
    this.validation = this.validation.bind(this);
    // console.log('Add Answer-props->', this.props)
  }
  setOpen = (option) => {

    this.setState({
      isOpen: option
    })
  }
  uploadPhotos = (imageData, previewData) => {
    // this.props.postTrackInteractions('Add answer', 'Questions and Answers');
    // console.log('imageData--3-->', imageData);
    // console.log('click upload name', data.name);

    this.setState({
      previewImages: previewData,
      photos: imageData
    })
  }
  validation = () => {
    if(this.state.answer.trim() === '' && this.state.nickname.trim() === '' && this.state.email.trim() === ''){
      // console.log('test1')
      this.setState({
        answerEmpty: false,
        nicknameEmpty: false,
        emailEmpty: false
      })
    }
    if(this.state.answer.trim() === ''){
      this.setState({answerEmpty: false})
    }
    if(this.state.nickname.trim() === ''){
      this.setState({nicknameEmpty: false})
    }
    if(this.state.email.trim() === ''){
      this.setState({emailEmpty: false})
    }
    if(!/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({emailValid: false})
    }


  }
  submitAnswer = ()=> {
    // this.props.postTrackInteractions('Submit answer', 'Questions and Answers');
    this.validation();

    if(this.state.validationInfo) {

        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const formData = new FormData();
      if(this.state.photos.length > 0) {
        console.log('ready to go server--->')
        for(let i =0; i < this.state.photos.length; i++) {
          formData.append('images', this.state.photos[i],this.state.photos[i].name)
        }
      }
      formData.append('question_id', this.props.oneQues.question_id)
      formData.append('body', this.state.answer)
      formData.append('name', this.state.nickname)
      formData.append('email', this.state.email)
      // console.log('submitAnswer***************')

      axios.post('/api/addAnswer', formData, config)
        .then(function(response){
          console.log('Success Creating the Answer-->',response);
        })
        .catch(function (error) {
          console.log('??????????->', error)
        })

      this.props.onClose();
    }

  }
  handleAnswerChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
    if(this.state.answer.trim() !== ''){
      this.setState({answerEmpty: true})
    }
    if(this.state.nickname.trim() !== ''){
      this.setState({nicknameEmpty: true})
    }
    if(this.state.email.trim() !== ''){
      this.setState({emailEmpty: true})
    }
    if(/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({emailValid: true})
    }
    if(this.state.answerEmpty && this.state.nickname && this.state.emailEmpty && this.state.emailValid){
      this.setState({validationInfo: true})
    }
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
          <p style={{color:"#727A74",fontStyle: "italic"}}>* (mandatory)</p>
          <div className="modal-body">
            <div>
              <label className="answer">Your Answer *</label>
                <textarea
                    data-testid="answer"
                    id="answer"
                    onChange={this.handleAnswerChange}
                    row={5}
                />
            </div>
            {(!this.state.answerEmpty) && <span style={REQUIRED_STYLES}>* answer required</span>}
            <div>
              <label className="nickname">nickname *</label>
                <input
                  data-testid="nickname"
                  type="text"
                  id="nickname"
                  onChange={this.handleAnswerChange}
                  placeholder='Example: jackson543'/>

            </div>
            {(!this.state.nicknameEmpty) && <span style={REQUIRED_STYLES}>* nickname required</span>}
            <div>
              <label className="email">email *</label>
                <input
                  data-testid="email"
                  type="text"
                  id="email"
                  onChange={this.handleAnswerChange}
                  placeholder = 'jack@email.com'/>
            </div>
            {(!this.state.emailEmpty) && <span style={REQUIRED_STYLES}>* email required</span>}
            {(!this.state.emailValid) && <span style={REQUIRED_STYLES}>* invalid email</span>}
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
const REQUIRED_STYLES = {
  color:'#be3e8d',
  fontStyle: "italic",
  fontSize:'12px'

}
export default ClickTracker(AddAnswer);