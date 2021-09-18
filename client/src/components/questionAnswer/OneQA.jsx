const React = require('react');
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';
import Moment from 'react-moment';

class OneQA extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen:false,
      // quetion_id: this.props.oneQues.question_id,
      questionHelpful:this.props.oneQues.question_helpfulness,
      // answer_id: this.props.OneAns.id,
      answerHelpful: this.props.oneAns.helpfulness
    }
    console.log('Props________:', this.props)
    // console.log('ONE QA--> ', this.state.quetion_id,this.state.questionHelpful )
    this.setOpen = this.setOpen.bind(this);
    this.questionUpdateHelpfulness = this.questionUpdateHelpfulness.bind(this);
    this.answerUpdateHelpfulness = this.answerUpdateHelpfulness.bind(this);
    this.setAnswerState = this.setAnswerState.bind(this);
  }

  setAnswerState = (ansId, ansHelpful) => {
    // console.log(ansId, ansHelpful)
    // this.setState({
    //   answerHelpful: ansHelpful
    // })
  }

  setOpen = (option) => {
    this.setState({
      isOpen: option
    })
  }
  questionUpdateHelpfulness = (questionId) => {
    //user only allowed to click one time
    const helpfulCount = this.props.oneQues.question_helpfulness + 1;

    if(this.state.questionHelpful < helpfulCount) {
      // console.log('Hello-->', questionId)
      axios.put('/update', {
        data: {
          question_id: questionId
        }
      })
        .then(response => {this.setState({questionHelpful: this.state.questionHelpful + 1})})
    }
  }
  answerUpdateHelpfulness = (answerId, answerHelpful) => {
    console.log('answerUpdateHelpfulness-->', answerId, answerHelpful);
    this.setState({answerHelpful: answerHelpful + 1})
    //user only allowed to click one time
    // const helpfulCount = this.props.one.question_helpfulness + 1;

    // if(this.state.questionHelpful < helpfulCount) {
    //   // console.log('Hello-->', questionId)
    //   axios.put('/update', {
    //     data: {
    //       question_id: questionId
    //     }
    //   })
    //     .then(response => {this.setState({questionHelpful: this.state.questionHelpful + 1})})
    // }
  }

  render(){
    // console.log('OneQA -->', this.props.one);
    const {oneAns, oneQues} = this.props;
    // console.log('OneQA -->', one);
    //need to revisit this key
    const answerId = oneAns.id;
    const answerBody = oneAns.body;
    const answererName = oneAns.answerer_name;
    const answerDate = oneAns.date;
    const answerHelpful = oneAns.helpfulness;


    return (
      <div className="oneQA">
        <div className="oneQuestion">
          <div className="qBody">
            <div className="bigQ">Q:</div>
            <div className="qBody1">{oneQues.question_body}</div>
          </div>
          <div className="helpful">Helpful?</div>
          <div className="yes" onClick={() => this.questionUpdateHelpfulness(oneQues.question_id)} >Yes ({this.state.questionHelpful})</div>

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
        <div className="oneAnswer">
          <div className="ans1">
            <div className='bigA'>A:</div>
            <div className="ansBody">{answerBody}</div>


            {/* {<img className='ansImg' src={}></img>} */}


          </div>
          <div className='ans2'>
            <div className='bigA'></div>
            <div className="by">by:</div>
            <div>

              </div>
                <div className="ansName" style={{ fontWeight: 'bold' }}>{answererName}

                      <div className="date" style={{ fontWeight: 'normal' }}> ,  <Moment format="MMM, DD, YYYY">{answerDate}</Moment></div>
                      <div className="helpful" style={{ fontWeight: 'normal' }}> | Helpful?</div>
                      <div className="yes" style={{ fontWeight: 'normal' }}
                        onClick={() => this.answerUpdateHelpfulness(answerId,answerHelpful)} >
                          Yes ({this.state.answerHelpful})</div>
                      <div className="report" style={{ fontWeight: 'normal' }}> | Report</div>
                </div>
            </div>
            <div className="loadAns"> LOAD MORE ANSWERS... </div>
        </div>

      </div>
    );
  }
}

export default OneQA;