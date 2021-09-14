import React from 'react';
import ReactDom from 'react-dom';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname:'',
      email:''
    }
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }
  handleQuestionChange = (e) =>{
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitQuestion = () => {
    console.log(this.state);
    this.props.onClose();
  }

  render(){
    console.log('Hello from Add question-->');
    if(!this.props.open) return null;
    console.log(`open ${this.props.open}, onClose-> ${this.props.onClose}`);

    return ReactDom.createPortal(
      <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
        <h3> Ask Your Question</h3>
        <h3> About the *Product Name*</h3>
        <div>
          {console.log('Inside div--->')}
          <label htmlFor="question-input">
            question
          </label>
          <textarea
              id="question-input"
              name='question'
              onChange={this.handleQuestionChange}
              row={5}/>
        </div>

        <p>For privacy reasons, do not use your full name or email address</p>
        <div>
          <label htmlFor="nickname">
            nickname (mandatory):
            <input
              id="nickname"
              type="text"
              name='nickname'
              onChange={this.handleQuestionChange}
              placeholder='Example: jackson11!'/>
          </label>
        </div>

        <div>
          <label>
            email (mandatory):
            <input
              type="text"
              name='email'
              onChange={this.handleQuestionChange}
              placeholder = 'Why did you like the product or not?'/>
          </label>
        </div>


        <button onClick={this.submitQuestion}>Submit Question</button>

      </div>
      </>,
      document.getElementById('portalQ') || document.createElement('div') //for testing purpose
    )
  }

}
const MODAL_Q_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .4)',
  zIndex: 1000
}



export default AddQuestion;