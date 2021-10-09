//main entry point to Q & A
import React from 'react';
import SearchQa from './SearchQa.jsx';
import ViewQuesAns from './ViewQuesAns.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class QuesAnsMain extends React.Component {

  //props-> {quesAns: Array(2), id: 47421, productUpdate: ƒ}
  constructor(props) {
   super(props)
   this.state = {
     queryString: '',
     filteredQues: this.props.quesAns,
     updated: false

    }
    this.updateQuesAns = this.updateQuesAns.bind(this);
    // console.log('filteresQues-->', this.state, this.props)

  }
  updateQuesAns = (data) => {
    console.log('Response search->', data)
    let search = '';
    search += data;
    // console.log('Search--1->' , search);

    if(search.length >=3 ){

      const filteredQues = this.state.filteredQues.filter(question => {
        return (question.question_body.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      })
      console.log('Search--->', filteredQues)

       this.setState({
        filteredQues: filteredQues,
        queryString: search,
        updated: true
      },()=>{console.log('newlist---->', this.state.filteredQues)})
    } else {
      this.setState({
        queryString: '',
        filteredQues: this.props.quesAns,
        updated: false
      })
    }



  }


  render() {

    const {quesAns, productId, productName} = this.props;
    const {queryString, filteredQues,updated} = this.state;
    // console.log('1Questions--1->', filteredQues)
    // console.log('1Questions--2->', quesAns)
    return (
      <div className="qa">

        <h2

          onClick={()=>this.props.postTrackInteractions('label', 'Questions and Answers')}>
          Questions and Answers
        </h2>

        <SearchQa
          filteredQues={filteredQues}
          updateQuesAns={this.updateQuesAns}
        />

        {
          updated?
          <div>
            <ViewQuesAns
              filteredQues={filteredQues}
              queryString={queryString}
              productId={productId}
              productName={productName}
              fetchQuestionAnswer={this.props.fetchQuestionAnswer}
            />
          </div> :
            <ViewQuesAns
              filteredQues={quesAns}
              productId={productId}
              productName={productName}
              fetchQuestionAnswer={this.props.fetchQuestionAnswer}
            />
        }


      </div>



    );
  }

}

export default ClickTracker(QuesAnsMain);