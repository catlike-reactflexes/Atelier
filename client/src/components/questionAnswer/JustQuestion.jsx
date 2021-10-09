import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class JustQuestion extends React.Component{
  constructor(props){

    super(props);
    // console.log('JUST QUESTION---->', props)
    this.state ={
      isOpen:false,
      questionHelpful:this.props.oneQues.question_helpfulness || 0,
      questionReport: false
    }

    // console.log('Just Question-->', this.props)
    this.setOpen = this.setOpen.bind(this);
    this.questionUpdateHelpfulness = this.questionUpdateHelpfulness.bind(this);
    this.questionReport = this.questionReport.bind(this);
    this.postAnswer = this.postAnswer.bind(this);
  }
  setOpen = (option) => {
    this.props.postTrackInteractions('Add answer', 'Questions and Answers')
    this.setState({
      isOpen: option
    })
  }
  postAnswer = (photos, answer, nickname, email)=> {
    // this.props.postTrackInteractions('Submit answer', 'Questions and Answers');

      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const formData = new FormData();
      if(photos.length > 0) {
        console.log('ready to go server--->')
        for(let i =0; i < photos.length; i++) {
          formData.append('images', photos[i],photos[i].name)
        }
      }
      formData.append('product_id', this.props.productId)
      formData.append('question_id', this.props.oneQues.question_id)
      formData.append('body', answer)
      formData.append('name', nickname)
      formData.append('email', email)

      // console.log('submitAnswer***************')

      axios.post('/api/addAnswer', formData, config)
        .then(response => {
          console.log('Success Creating the Answer-->',response);
          // this.props.fetchQuestionAnswer();
          this.props.fetchAnswers();
        }


        )
        .catch(error=>{
          console.log('why ??????????->', error)
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
          questionid: questionId
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
          questionid: questionId
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

    // console.log('justQuestion props->', this.props)

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
                    productId = {this.props.productId}
                    postAnswer = {this.postAnswer}
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
