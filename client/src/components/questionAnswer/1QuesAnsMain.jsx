//main entry point to Q & A
import React from 'react';
import SearchQa from './SearchQa.jsx';
import ViewQuestion from './ViewQuestion.jsx';
import AddQuestion from './AddQuestion.jsx';
import AddAnswer from './AddAnswer.jsx';

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
    console.log('Whatis props-->', this.props);
    const {quesAns} = this.props;
    return (
      <div className="qa">
        <p>Questions and Answers</p>
        <SearchQa/>
        <ViewQuestion quesAnsLists={quesAns}/>

        <div style = {BUTTON_STYLES}>
          <button onClick={() => this.setOpen(true)}>ADD A QUESTION +</button>

          {this.state.isOpen ?
            <AddQuestion
              open ={this.state.isOpen}
              onClose={() => this.setOpen(false)}/> : null}

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