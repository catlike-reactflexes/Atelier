import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class JustQuestion extends React.Component{
  constructor(props){

    super(props);
    // console.log('JUST QUESTION---->', props)
    this.state ={
      productId: Number((window.location.pathname.split('/')[1])),
      isOpen:false,
      questionHelpful:this.props.oneQues.question_helpfulness || 0,
      questionReport: false
    }

    // console.log('Just Question-->', this.props)
    this.setOpen = this.setOpen.bind(this);
    this.questionUpdateHelpfulness = this.questionUpdateHelpfulness.bind(this);
    this.questionReport = this.questionReport.bind(this);
  }
  setOpen = (option) => {
    this.props.postTrackInteractions('Add answer', 'Questions and Answers')
    this.setState({
      isOpen: option
    })
  }

  questionUpdateHelpfulness = (questionId) => {
    this.props.postTrackInteractions('Question helpfulness','Question And Answer')
    //user only allowed to click one time
    const helpfulCount = this.props.oneQues.question_helpfulness + 1;

    if(this.state.questionHelpful < helpfulCount) {
      // console.log('Hello-->', questionId)
      axios.put('/api/update', {
        data: {
          productId: this.state.productId,
          questionId
        }
      })
        .then(response => {
          this.setState({
            questionHelpful: this.state.questionHelpful + 1})
          })
    }
  }

  questionReport = (questionId) => {
    //user only allowed to click one time
    this.props.postTrackInteractions('Report a question','Question And Answer')
    if(!this.state.questionReport) {
      // console.log('Hello-->', questionId)
      axios.put('/api/report', {
        data: {
          productId: this.state.productId,
          questionId
        }
      })
        .then(response => {
          this.setState({
            questionReport: true})
          })
    }
  }

  render(){
      // console.log('More answers--->', this.props)
    const {oneQues, queryString} = this.props;
    const {questionReport} = this.state;
    let string1='', string2='', string3 ='';
    if(queryString){
      let queryLength=queryString.length || 0;
      let indexAtQueryString = oneQues.question_body.indexOf(queryString);
      console.log('indexquery->', queryString, indexAtQueryString, queryLength)
      if(indexAtQueryString !== -1){
        string1= oneQues.question_body.slice(0, indexAtQueryString)
        string2=oneQues.question_body.slice(indexAtQueryString,indexAtQueryString + queryLength )
        string3=oneQues.question_body.slice(indexAtQueryString + queryLength )
      }
      console.log('String:', string1, 'string2', string2, 'string3',string3)
    }

    // console.log('Query String in Just Question-->', queryString)

    return (
      <div className="justQues">
        <div className="qBody">
            <div className="bigQ">Q:</div>

            <div className="qBody1">
              {
                !queryString ? <div className="qBody1">{oneQues.question_body}</div> :
                <div>
                  <span>{string1}</span>
                  <span style={{backgroundColor:"yellow"}}>{string2}</span>
                  <span>{string3}</span>
                </div>
              }
            </div>
            {/* <div className="qBody1">{oneQues.question_body}</div> */}
        </div>
        <div className="ques2">
          <div className="helpful">Helpful?</div>
            <div className="yes"
              onClick={() => this.questionUpdateHelpfulness(oneQues.question_id)} >
                Yes ({this.state.questionHelpful})
            </div>
            {
              questionReport ?
                <div className="reported"> | Reported    |</div> :
                <div className="report"
                  onClick={() => this.questionReport(oneQues.question_id)}> | Report    |
                </div>
            }

              <div className="label-Ans" onClick={() => this.setOpen(true)}> |  Add Answer</div>
                {
                  this.state.isOpen ?
                  <AddAnswer
                    oneQues={oneQues}
                    productName={this.props.productName}
                    open ={this.state.isOpen}
                    onClose={() => this.setOpen(false)}/>
                  : null
                }
            </div>

      </div>
    );
  }
}

export default ClickTracker(JustQuestion) ;
