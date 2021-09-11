const React = require('react');
import AddAnswer from './AddAnswer.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen:false
    }
    this.setOpen = this.setOpen.bind(this);
  }
  setOpen = (option) => {
    this.setState({
      isOpen: option
    })
  }
  render(){
    // console.log('OneQA -->', this.props.one);
    const {one} = this.props;
    const answer=one.answers[3715621];
    console.log('Answer-->', answer)
    

    return (
      <div>
        <div className="question">
          <p>Question:</p>
          {one.question_body}
          <div>helpful</div>
        </div>
        <div className="answer">
          {/* <p>Answer:</p>
          {(answerBody)? {answerBody}: undefined}


          <div>
            <p>by:</p>
            {(answererName)? {answererName}: undefined}
          </div> */}
        </div>


        <div>
          <button onClick={() => this.setOpen(true)}>Add Answer</button>

          {this.state.isOpen ?
            <AddAnswer
              open ={this.state.isOpen}
              onClose={() => this.setOpen(false)}/> : null}

        </div>
      </div>
    );
  }
}

export default OneQA;