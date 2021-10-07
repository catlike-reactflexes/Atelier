import React from 'react';
import QuesAns from './QuesAns.jsx';
import MoreQuestion from './MoreQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class ViewQuesAns extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      twoQuestions: this.props.filteredQues.slice(0,2),
      restOfQuestions: this.props.filteredQues.slice(2),
      moreQA: true,
      isOpen: false
    }
    this.setOpen = this.setOpen.bind(this);
    this.updateQuesAns = this.updateQuesAns.bind(this);
    // console.log('ViewQuestion--->', this.state.twoQuestions, this.state.restOfQuestions)
  }
  setOpen = (option) =>{
    this.props.postTrackInteractions('Add A Question', 'Questions and Answers');
    this.setState({
      isOpen:option
    })
  }
  updateQuesAns = (quesData, more) => {
    // console.log('more incoming Question-->', quesData, more);
    if(!more) {

      this.setState({
        twoQuestions : this.state.twoQuestions.concat(quesData),
        moreQA : more
      })

    } else {
      // console.log('~~~~View Question~~~~~~~~~EDGE CASE~~~~~~~~~')
      this.setState({
        twoQuestions : this.state.twoQuestions.concat(quesData),
        restOfQuestions : this.state.restOfQuestions.slice(2)
      })

    }
    // console.log('View Question State->', this.state.twoQuestions, more)

  }

  render() {

    const {moreQA, twoQuestions, restOfQuestions} = this.state;
    // console.log('QuestionAns View Question props--->', moreQA, twoQuestions, restOfQuestions )

    return (

      <div>
        <QuesAns quesAnsLists={twoQuestions} moreQA={moreQA} productName={this.props.productName}/>
        <div className="twoButton">
          {
            restOfQuestions.length > 0 && moreQA ?
            <div>
              <MoreQuestion  restOfQuestions={restOfQuestions}
                              moreQA={moreQA}
                              updateQA={this.updateQuesAns}/>
            </div> : undefined
          }
          <div style = {BUTTON_STYLES}>

            <button className="addQues" onClick={() => this.setOpen(true)}>ADD A QUESTION +</button>
            {
              this.state.isOpen ?
              <AddQuestion
              productId = {this.props.productId}
              productName = {this.props.productName}
              open ={this.state.isOpen}
              onClose={() => this.setOpen(false)}/> : null
            }

          </div>
        </div>
      </div>

    );
  }

}
const BUTTON_STYLES = {
  position: 'relative',
  zIndex: 1
}
export default ClickTracker(ViewQuesAns);