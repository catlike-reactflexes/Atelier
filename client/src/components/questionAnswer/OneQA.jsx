const React = require('react');
import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';
import Moment from 'react-moment';

class OneQA extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen:false,
      quetion_id: this.props.one.question_id,
      questionHelpful:this.props.one.question_helpfulness,
      answerHelpful: 0
    }
    console.log('ONE QA--> ', this.state.quetion_id,this.state.questionHelpful )
    this.setOpen = this.setOpen.bind(this);
    this.questionUpdateHelpfulness = this.questionUpdateHelpfulness.bind(this);
    this.answerUpdateHelpfulness = this.answerUpdateHelpfulness.bind(this);
  }

  setAnswerState = () => {

  }

  setOpen = (option) => {
    this.setState({
      isOpen: option
    })
  }
  questionUpdateHelpfulness = (questionId) => {
    //user only allowed to click one time
    const helpfulCount = this.props.one.question_helpfulness + 1;

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
    const {one} = this.props;
    console.log('OneQA -->', one);
    //need to revisit this key
    const answerId = [];
    for(let key in one.answers){
      // console.log('Key-->', key)
      answerId.push(key);
    }
    const firstAnswerId = one.answers[answerId[0]].id;
    console.log('firstAnswerId-->', firstAnswerId)
    const answerBody = one.answers[answerId[0]].body;
    const answererName = one.answers[answerId[0]].answerer_name;
    const answerDate = one.answers[answerId[0]].date;
    const answerHelpful = one.answers[answerId[0]].helpfulness;

    return (
      <div className="oneQA">
        <div className="oneQuestion">
          <div className="qBody">
            <div className="bigQ">Q:</div>
            <div className="qBody1">{one.question_body}</div>
          </div>
          <div className="helpful">Helpful?</div>
          <div className="yes" onClick={() => this.questionUpdateHelpfulness(one.question_id)} >Yes ({this.state.questionHelpful})</div>

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
          </div>
          <div className='ans2'>
            <div className='bigA'></div>
            <div className="by">by:</div>
            <div className="ansName">{answererName}
                <div className="date"> ,  <Moment format="MMM, DD, YYYY">{answerDate}</Moment></div>
                <div className="helpful"> | Helpful?</div>
                <div className="yes" onClick={() => this.answerUpdateHelpfulness(firstAnswerId,answerHelpful)} >Yes ({answerHelpful})</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OneQA;