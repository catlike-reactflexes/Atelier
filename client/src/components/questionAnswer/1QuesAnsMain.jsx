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
      quesAns: this.props.quesAns,
      productId: this.props.id,
      moreQA: true,
      isOpen: false
    }
    this.setOpen = this.setOpen.bind(this);
    this.updateQuesAns = this.updateQuesAns.bind(this);
  }

  updateQuesAns = (data) => {
    // console.log('test updateQuesAns---1', data.data)
    let incomingQA = data.data;
    let addQA= this.props.quesAns;
    for(let i =0; i < 2; i++){
      if(incomingQA[i]){
        addQA.push(incomingQA[i])
      } else {
        //if no more QA , set state
        this.setState({
          moreQA: false
        })
      }
    }
    this.setState({
      quesAns : addQA
    })
    // console.log('Latest update-3-->', this.state.quesAns)
  }
  setOpen = (option) =>{
    this.setState({
      isOpen:option
    })
  }
  render() {
    console.log('This props--->', this.props)
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
          {this.state.moreQA && <div><MoreQuestion quesId={questionId} productId={this.state.productId} updateQA={this.updateQuesAns}/></div>}
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