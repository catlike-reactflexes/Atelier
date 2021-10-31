import React from 'react';
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      questionEmpty: true,
      nickname:'',
      nicknameEmpty: true,
      email:'',
      emailEmpty:true,
      emailValid:true,
      validateInfo: false
    }
    // console.log('SubmitQuestion- props->',this.props);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.validation = this.validation.bind(this);
  }
  handleQuestionChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    })
    if(this.state.question.trim() !== ''){
      this.setState({questionEmpty: true})
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
  }
  validation = () => {
    if(this.state.question.trim() === '' && this.state.nickname.trim() === '' && this.state.email.trim() === ''){
      // console.log('test')
      this.setState({
        questionEmpty: false,
        nicknameEmpty: false,
        emailEmpty: false
      })
    } else
    if(this.state.nickname.trim() === ''){
      this.setState({nicknameEmpty: false})
    } else
    if(this.state.email.trim() === ''){
      this.setState({emailEmpty: false})
    } else
    if(!/\S+@\S+\.\S+/.test(this.state.email)) {
      this.setState({emailValid: false})
    } else {
      this.setState({validateInfo: true})
    }
  }
  submitQuestion = () => {
    this.props.postTrackInteractions('Submit question', 'Questions And Answers')
    // console.log('SubmitQuestion- props->',this.state);
    this.validation ();
    if(this.state.validateInfo){
      // console.log('SubmitQuestion-->',this.props.productId, this.state);
        axios.post('/api/addQuestion', {
          product_id: this.props.productId,
          body: this.state.question,
          name: this.state.nickname,
          email: this.state.email

        })
          .then(function(response){
            console.log('Success Creating the Question-->',response);
          })
          .catch(function (error) {
            console.log('Error sending to server with your Question->', error)
          })

      this.props.onClose();
    }

  }

  render(){
    // console.log('Hello from Add question-->');
    if(!this.props.open) return null;
    // console.log(`open ${this.props.open}, onClose-> ${this.props.onClose}`);

    return (

      <div id="add-question">
        <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
        <div className="modal-header">
          <h3>Ask Your Question</h3>
          <span onClick={()=>this.props.onClose()}>X</span>
        </div>

        <div className="modal-content">
          <p className="modal-product">Your Product: {this.props.productName} </p>
          <p style={{color:"#727A74",fontStyle: "italic"}}>* (mandatory)</p>
          <div className="modal-body">
            <div className="modal-question">
              <div style={{padding:"10px"}}>Question*</div>
                <textarea
                    data-testid="question"
                    id="question"
                    placeholder="Go ahead, ask away"
                    onChange={this.handleQuestionChange}
                    rows={5}
                    cols={50}
                />
            {(!this.state.questionEmpty) && <span style={REQUIRED_STYLES}>* question required</span>}
            </div>
            <p>For privacy reasons, do not use your full name or email address</p>
            <div className="modal-info">
              <div htmlFor="nickname" style={{padding:"10px"}}>nickname*</div>
                <input
                  data-testid="nickname"
                  type="text"
                  id="nickname"
                  onChange={this.handleQuestionChange}
                  placeholder='Example: jackson11!'/>

            {(!this.state.nicknameEmpty) && <span style={REQUIRED_STYLES}>* nickname required</span>}

                <div htmlFor="email" style={{padding:"10px"}}>email*</div>

                  <input
                    data-testid="email"
                    type="text"
                    id="email"

                    onChange={this.handleQuestionChange}
                    placeholder = 'atelier@aol.com'/>

            {(!this.state.emailEmpty) && <span style={REQUIRED_STYLES}>* email required</span>}
            {(!this.state.emailValid) && <span style={REQUIRED_STYLES}>* invalid email</span>}
            </div>

          </div>

          <div className="modal-footer">
          <button type="submit" onClick={this.submitQuestion}>Submit Question</button>
          </div>


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
  zIndex: 100
}
const REQUIRED_STYLES = {
  color:'#be3e8d',
  fontStyle: "italic",
  fontSize:'12px'

}


export default ClickTracker(AddQuestion);