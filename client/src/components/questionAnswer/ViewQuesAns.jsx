import React from 'react';
import QuesAns from './QuesAns.jsx';
import MoreQuestion from './MoreQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';


class ViewQuesAns extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quesAns: this.props.quesAnsId,
      productId: this.props.productId,
      moreQA: true,
      isOpen: false
    }
    this.setOpen = this.setOpen.bind(this);
    this.updateQuesAns = this.updateQuesAns.bind(this);
    // console.log('ViewQuestion--->', this.state.quesAns, this.state.productId)
  }
  setOpen = (option) =>{
    this.setState({
      isOpen:option
    })
  }
  updateQuesAns = (data) => {
    // console.log('more incoming Question-->', data);
    let addQuesAns = this.state.quesAns;
    for(let i = 0 ; i < 2; i++) {
      if(data[i]){
        addQuesAns.push(data[i])
      }
    }
    this.setState({
      quesAns : addQuesAns
    })
    // console.log('The state--->', this.state.quesAns);
  }

  render() {
    // console.log('QuestionAns View Question props--->', this.props)
    const {quesAns, productId} = this.state;
    let questionId = [];
    // console.log('What is props-->', quesAns[0]);
    Object.entries(quesAns).map(([key, value])=>{
      // console.log('Key-->', key)
      // console.log('value-->', value.question_id)
      questionId.push(value.question_id)
    })
    return (

        <div>
        <QuesAns quesAnsLists={quesAns}/>
        <div className="twoButton">
          {
            this.state.moreQA &&
            <div><MoreQuestion quesId={questionId} productId={productId} updateQA={this.updateQuesAns}/></div>
          }
          <div style = {BUTTON_STYLES}>
            <button className="addQues" onClick={() => this.setOpen(true)}>ADD A QUESTION +</button>

            {this.state.isOpen ?
              <AddQuestion
                open ={this.state.isOpen}
                onClose={() => this.setOpen(false)}/> : null}

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