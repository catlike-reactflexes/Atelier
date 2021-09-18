//main entry point to Q & A
import React from 'react';
import SearchQa from './SearchQa.jsx';
import ViewQuestion from './ViewQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';
import AddAnswer from './AddAnswer.jsx';
import MoreQuestion from './MoreQuestion.jsx';

class QuesAnsMain extends React.Component {
  constructor(props) {

    super(props);
    this.state = {
      isOpen: false
    }
    this.setOpen = this.setOpen.bind(this);
  }
  setOpen = (option) =>{
    this.setState({
      isOpen:option
    })
  }
  render() {

    const {quesAns, id} = this.props;
    let questionId = [];
    // console.log('What is props-->', quesAns[0]);
    Object.entries(quesAns).map(([key, value])=>{
      // console.log('Key-->', key)
      // console.log('value-->', value.question_id)
      questionId.push(value.question_id)
    })
    // console.log('ANSWER-->',answerId );

    return (
      <div className="qa">
        <p>Questions and Answers</p>
        <SearchQa/>
        <ViewQuestion quesAnsLists={quesAns}/>
        <div className="twoButton">
          <div><MoreQuestion quesId={questionId} productId={id}/></div>
          <div style = {BUTTON_STYLES}>
            <button className="addQues" onClick={() => this.setOpen(true)}>ADD A QUESTION +</button>

            {this.state.isOpen ?
              <AddQuestion
                open ={this.state.isOpen}
                onClose={() => this.setOpen(false)}/> : null}

          </div>
        </div>

        <AddAnswer/>
      </div>

    );
  }

}
const BUTTON_STYLES = {
  position: 'relative',
  zIndex: 1
}
export default QuesAnsMain;