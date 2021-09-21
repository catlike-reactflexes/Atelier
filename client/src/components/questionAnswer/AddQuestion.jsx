import React from 'react';
import axios from 'axios';

class AddQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      nickname:'',
      email:''
    }
    console.log('SubmitQuestion- props->',this.props);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.submitQuestion = this.submitQuestion.bind(this);
  }
  handleQuestionChange = (e) =>{
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  submitQuestion = () => {
    console.log('SubmitQuestion- props->',this.props);
    console.log('SubmitQuestion-->',this.props.productId, this.state);

    axios.post('/addQuestion', {
      product_id: this.props.productId,
      body: this.state.question,
      name: this.state.nickname,
      email: this.state.email

    })
      .then(function(reponse){
        console.log('Success Creating the Question-->',response);
      })
      .catch(function (error) {
        console.log('Error sending to server with your Question->', error)
      })
    this.props.onClose();
  }

  render(){
    // console.log('Hello from Add question-->');
    if(!this.props.open) return null;
    // console.log(`open ${this.props.open}, onClose-> ${this.props.onClose}`);

    return (
      <div id="add-question">
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
        <h3> Ask Your Question</h3>
        <h3> About the *Product Name*</h3>

        <div>

          <label htmlFor="question">Question</label>
          <textarea
              data-testid="question"
              id="question"
              onChange={this.handleQuestionChange}
              row={5}/>
        </div>

        <p>For privacy reasons, do not use your full name or email address</p>
        <div>
          <label htmlFor="nickname">nickname (mandatory): </label>
            <input
              data-testid="nickname"
              type="text"
              id="nickname"
              onChange={this.handleQuestionChange}
              placeholder='Example: jackson11!'/>

        </div>

        <div>
          <label htmlFor="email">
            email (mandatory):
            <input
              data-testid="email"
              type="text"
              id="email"

              onChange={this.handleQuestionChange}
              placeholder = 'Why did you like the product or not?'/>
          </label>
        </div>


        <button type="submit" onClick={this.submitQuestion}>Submit Question</button>

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