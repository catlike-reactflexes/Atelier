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

    const {quesAns, id, productName} = this.props;
    const {queryString, filteredQues,updated} = this.state;
    // console.log('QuestionAns filtered props--->', filteredQues)
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
              productId={id}
              productName={productName}
            />
          </div> :
            <ViewQuesAns
              filteredQues={quesAns}
              productId={id}
              productName={productName}
            />
        }


      </div>



    );
  }

}

export default ClickTracker(QuesAnsMain);