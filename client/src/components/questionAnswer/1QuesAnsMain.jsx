//main entry point to Q & A
import React from 'react';
import SearchQa from './SearchQa.jsx';
import ViewQuesAns from './ViewQuesAns.jsx';

class QuesAnsMain extends React.Component {

  //props-> {quesAns: Array(2), id: 47421, productUpdate: ƒ}
  constructor(props) {
    super(props);
    // this.state = {
    //   quesAns: this.props.quesAns,
    //   productId: this.props.id,
    // }
  }

  render() {
    console.log('QuestionAns MAIN props--->', this.props)

    return (
      <div className="qa">
        <p>Questions and Answers</p>
        <SearchQa/>

        {
          this.props.quesAns.length > 0 ?
          <div><ViewQuesAns quesAnsId={this.props.quesAns} productId={this.props.id}/></div> : undefined
        }
        {console.log('QuestionAns MAIN props-2-->', this.props)}
      </div>



    );
  }

}

export default QuesAnsMain;