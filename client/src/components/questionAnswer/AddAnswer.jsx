const React = require('react');
import axios from 'axios';

class AddAnswer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      answer: '',
      nickname:'',
      email:''
    }
    this.submitAnswer= this.submitAnswer.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    console.log('Add Answer-props->', this.props)
  }
  submitAnswer = ()=> {
    console.log('submit answer');
    console.log(this.state)
    axios.post('/addAnswer', {
      question_id: this.props.oneQues.question_id,
      body: this.state.answer,
      name: this.state.nickname,
      email: this.state.email,
      photos: []
    })
      .then(function(reponse){
        console.log('Success Creating the Answer-->',response);
      })
      .catch(function (error) {
        console.log('Error sending to server->', error)
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
      <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
        <p>Submit your Answer</p>
        <p>{productName} : {question_body}</p>
        <div>
          <label htmlFor="answer">Your Answer (mandatory</label>
            <textarea
                data-testid="answer"
                id="answer"
                onChange={this.handleAnswerChange}
                row={5}/>

        </div>

        <div>
          <label htmlFor="nickname">nickname (mandatory): </label>
            <input
              data-testid="nickname"
              type="text"
              id="nickname"
              onChange={this.handleAnswerChange}
              placeholder='Example: jackson543'/>

        </div>

        <div>
          <label htmlFor="email">
            email (mandatory):
            <input
              data-testid="email"
              type="text"
              id="email"

              onChange={this.handleAnswerChange}
              placeholder = 'jack@email.com'/>
          </label>
        </div>
        <button onClick={this.uploadPhotos}>Upload Photos (5 max)</button>
        <button onClick={this.submitAnswer}>Submit Answer</button>
      </div>
      </>
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
export default AddAnswer;