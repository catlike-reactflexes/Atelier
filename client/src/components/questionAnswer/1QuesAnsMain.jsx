//main entry point to Q & A
import React from 'react';
import SearchQa from './SearchQa.jsx';
import ViewQuesAns from './ViewQuesAns.jsx';

class QuesAnsMain extends React.Component {

  //props-> {quesAns: Array(2), id: 47421, productUpdate: ƒ}
  constructor(props) {
   super(props)
  }

  render() {
    console.log('QuestionAns MAIN props--->', this.props)
    const {quesAns, id} = this.props;

    return (
      <div className="qa">
        <p>Questions and Answers</p>
        <SearchQa quesAns={quesAns} productId={id}/>

        {
          this.props.quesAns.length > 0 ?
          <div><ViewQuesAns quesAns={quesAns} productId={id} productName={this.props.productName}/></div> : undefined
        }
        {console.log('QuestionAns MAIN props-2-->', this.props)}
      </div>



    );
  }

}

export default QuesAnsMain;