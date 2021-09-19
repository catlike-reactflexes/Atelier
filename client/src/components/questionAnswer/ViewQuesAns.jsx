import React from 'react';
import QuesAns from './QuesAns.jsx';
import MoreQuestion from './MoreQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';


class ViewQuesAns extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // quesAns: this.props.quesAnsId,
      // productId: this.props.productId,
      twoQuestions: this.props.quesAnsId.slice(0,2),
      restOfQuestions: this.props.quesAnsId.slice(2),
      moreQA: true,
      isOpen: false
    }
    this.setOpen = this.setOpen.bind(this);
    this.updateQuesAns = this.updateQuesAns.bind(this);
    // console.log('ViewQuestion--->', this.state.twoQuestions, this.state.restOfQuestions)
  }
  setOpen = (option) =>{
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
        <QuesAns quesAnsLists={twoQuestions} moreQA={moreQA}/>
        <div className="twoButton">
          {
            this.state.moreQA &&
            <div><MoreQuestion  restOfQuestions={restOfQuestions} moreQA={moreQA} updateQA={this.updateQuesAns}/></div>
          }
          <div style = {BUTTON_STYLES}>

            <button className="addQues" onClick={() => this.setOpen(true)}>ADD A QUESTION +</button>
            {
              this.state.isOpen ?
              <AddQuestion
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
export default ViewQuesAns;