import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';

class JustQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      isOpen:false,
      questionHelpful:this.props.justOneQues.question_helpfulness,
    }

    // console.log('Just Question-->', this.props)
    this.setOpen = this.setOpen.bind(this);
    this.questionUpdateHelpfulness = this.questionUpdateHelpfulness.bind(this);
  }
  setOpen = (option) => {
    this.setState({
      isOpen: option
    })
  }

  questionUpdateHelpfulness = (questionId) => {
    //user only allowed to click one time
    const helpfulCount = this.props.justOneQues.question_helpfulness + 1;

    if(this.state.questionHelpful < helpfulCount) {
      // console.log('Hello-->', questionId)
      axios.put('/update', {
        data: {
          questionid: questionId
        }
      })
        .then(response => {
          this.setState({
            questionHelpful: this.state.questionHelpful + 1})
          })
    }
  }

  render(){
      // console.log('More answers--->', this.props)
    const {justOneQues} = this.props;

    return (
      <div className="justQues">
        <div className="qBody">
            <div className="bigQ">Q:</div>
            <div className="qBody1">{justOneQues.question_body}</div>
        </div>
        <div className="ques2">
          <div className="helpful">Helpful?</div>
            <div className="yes"
              onClick={() => this.questionUpdateHelpfulness(justOneQues.question_id)} >
                Yes ({this.state.questionHelpful})
            </div>
            <div className="AddAns">
              <div onClick={() => this.setOpen(true)}>Add Answer</div>
                {
                  this.state.isOpen ?
                  <AddAnswer
                    open ={this.state.isOpen}
                    onClose={() => this.setOpen(false)}/>
                  : null
                }
            </div>
        </div>
      </div>
    );
  }
}

export default JustQuestion;
