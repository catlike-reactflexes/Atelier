const React = require('react');
import axios from 'axios';
import JustQuestion from './JustQuestion.jsx';
import MoreAnswer from './MoreAnswers.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    const {allAns, oneQues} = this.props;
    // console.log('ONE QA--->', allAns, oneQues);
    let sellerList = []
    let newAnswerList = [];

    for(let i =0; i < allAns.length; i++) {
      if(allAns[i].answerer_name.toLowerCase() === 'seller'){
        // console.log('found seller', this.props.allAns[i].answerer_name)
        sellerList.push(allAns[i])
      } else {
        newAnswerList.push(allAns[i])
      }
    }
    if(sellerList.length > 0){
      newAnswerList = sellerList.concat(newAnswerList)
    }

    return (
      <div className="oneQA">

        <div
            className="oneQuestion"
            onClick={()=>{this.props.postTrackInteractions('Question', 'Question And Answer')}}>
            <JustQuestion
              oneQues={oneQues} productName={this.props.productName} productId = {this.props.productId} queryString={this.props.queryString} fetchQuestionAnswer={this.props.fetchQuestionAnswer}
            />
        </div>

        <div className="oneAnswer1">
            <MoreAnswer allAns={newAnswerList} oneQues={oneQues}/>
        </div>

      </div>
    );
  }
}

export default ClickTracker(OneQA);