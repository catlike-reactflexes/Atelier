const React = require('react');
// import AddAnswer from './AddAnswer.jsx';
import axios from 'axios';
import JustQuestion from './JustQuestion.jsx';
import MoreAnswer from './MoreAnswers.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
    this.state = {

      moreAnsClick: true,
      // quetion_id: this.props.oneQues.question_id,

      // answer_id: this.props.OneAns.id,
      ansCounter: 0,
      answerHelpful: this.props.allAns[0].helpfulness,
      moreAns:[]
    }
    // console.log('Props________:', this.props)
    // console.log('ONE QA--> ', this.state.answerHelpful,this.state.questionHelpful )


    this.answerUpdateHelpfulness = this.answerUpdateHelpfulness.bind(this);
    this.setAnswerState = this.setAnswerState.bind(this); //????? NEED TO REVISIT
    this.loadMoreAns = this.loadMoreAns.bind(this);
  }

  loadMoreAns = () => {
    console.log('more answer************')
    this.setState({
      ansCounter: this.state.ansCounter + 1
    })
  }
  setAnswerState = (ansId, ansHelpful) => {
    // console.log(ansId, ansHelpful)
    // this.setState({
    //   answerHelpful: ansHelpful
    // })
  }



  answerUpdateHelpfulness = (answerId, answerHelpful) => {
    // console.log('answerUpdateHelpfulness-->', answerId, answerHelpful);
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
    const {allAns, oneQues} = this.props;
    // const {ansCounter} = this.state;
    // console.log('OneQA -->', one);
    //need to revisit this key



    return (
      <div className="oneQA">
        <div className="oneQuestion">
          <JustQuestion justOneQues={oneQues}/>
        </div>
        <div className="oneAnswer1">
            <MoreAnswer allAnswers={allAns}/>
        </div>


      </div>
    );
  }
}

export default OneQA;