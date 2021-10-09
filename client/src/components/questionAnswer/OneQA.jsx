const React = require('react');
import axios from 'axios';
import JustQuestion from './JustQuestion.jsx';
import MoreAnswer from './MoreAnswers.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
    this.state={

      incomingAnswer: false,
      incomingAnswersList:this.props.allAns
    }
    this.fetchAnswers = this.fetchAnswers.bind(this)
  }
  fetchAnswers() {

    const { question_id } = this.props.oneQues;
    console.log('Ready to fetch more answers-->')
    console.log('Fetching-id->', question_id)
    axios({
      method: 'get',
      url: `/api/getAnswers/`,
      params: {
        question_id: question_id,
        count: 10
      }
    })
      .then(data => {
        console.log('coming back from server Answers->', data.data)
        this.setState({ incomingAnswersList: data.data , incomingAnswer: true})
      })
      .catch(error => {
        console.error(error)
      })
  }

  render(){

    const {allAns, oneQues} = this.props;
    let {incomingAnswersList} = this.state;
    console.log('ONE QA--incomingList- 1-->', incomingAnswersList);

    // let sellerList = []
    // let newAnswerList = [];

    // for(let i =0; i < allAns.length; i++) {
    //   if(allAns[i].answerer_name.toLowerCase() === 'seller'){
    //     // console.log('found seller', this.props.allAns[i].answerer_name)
    //     sellerList.push(allAns[i])
    //   } else {
    //     newAnswerList.push(allAns[i])
    //   }
    // }
    // if(sellerList.length > 0){
    //   newAnswerList = sellerList.concat(newAnswerList)
    // }
    let incomingSellerList = []
    let newIncomingAnswerList = [];

    for(let i =0; i < incomingAnswersList.length; i++) {
      if(incomingAnswersList[i].answerer_name.toLowerCase() === 'seller'){
        // console.log('found seller', this.props.allAns[i].answerer_name)
        incomingSellerList.push(incomingAnswersList[i])
      } else {
        newIncomingAnswerList.push(incomingAnswersList[i])
      }
    }
    if(incomingSellerList.length > 0){
      newIncomingAnswerList = incomingSellerList.concat(newIncomingAnswerList)
    }

    console.log('ONE QA---incoming list-2->', newIncomingAnswerList, this.state.incomingAnswer);
    return (
      <div className="oneQA">

        <div
            className="oneQuestion"
            onClick={()=>{this.props.postTrackInteractions('Question', 'Question And Answer')}}>
            <JustQuestion
              oneQues={oneQues}
              productName={this.props.productName}
              productId = {this.props.productId}
              queryString={this.props.queryString}
              fetchAnswers={this.fetchAnswers}
              fetchQuestionAnswer={this.props.fetchQuestionAnswer}
            />
        </div>
        <div className="oneAnswer1">
            <MoreAnswer allAns={newIncomingAnswerList} oneQues={oneQues} incomingAnswer={this.state.incomingAnswer}/>
          </div>
        {/* {
          this.state.incomingAnswer ?
          <div className="oneAnswer1">
            <MoreAnswer allAns={newIncomingAnswerList} oneQues={oneQues}/>
          </div>
          :
          <div className="oneAnswer1">
            <MoreAnswer allAns={newIncomingAnswerList} oneQues={oneQues}/>
          </div>
        } */}


      </div>
    );
  }
}

export default ClickTracker(OneQA);