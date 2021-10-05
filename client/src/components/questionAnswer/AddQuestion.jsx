import React from 'react';
import axios from 'axios';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

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
    this.props.postTrackInteractions('Submit question', 'Questions And Answers')
    // console.log('SubmitQuestion- props->',this.props);
    // console.log('SubmitQuestion-->',this.props.productId, this.state);

    axios.post('/api/addQuestion', {
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
        <div className="modal-header">
          <h3>Ask Your Question</h3>
          <span onClick={()=>this.props.onClose()}>X</span>
        </div>

        <div className="modal-content">
          <p className="modal-product">Your Product: {this.props.productName} </p>
          <div className="modal-body">
            <div className="modal-question">
              <div style={{padding:"10px"}}>Question</div>
                <textarea
                    data-testid="question"
                    id="question"
                    placeholder="Go ahead, ask away"
                    onChange={this.handleQuestionChange}
                    rows={5}
                    cols={50}
                />

            </div>
            <p>For privacy reasons, do not use your full name or email address</p>
            <div className="modal-info">
              <div htmlFor="nickname" style={{padding:"10px"}}>nickname (mandatory) </div>
                <input
                  data-testid="nickname"
                  type="text"
                  id="nickname"
                  onChange={this.handleQuestionChange}
                  placeholder='Example: jackson11!'/>



                <div htmlFor="email" style={{padding:"10px"}}>email (mandatory)</div>

                  <input
                    data-testid="email"
                    type="text"
                    id="email"

                    onChange={this.handleQuestionChange}
                    placeholder = 'atelier@yahoo.com'/>



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
  zIndex: 1000
}



export default ClickTracker(AddQuestion);