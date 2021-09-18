const React = require('react');
import axios from 'axios';
import ViewQuestion from './ViewQuestion.jsx';

class MoreQuestion extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      quesAns : []
    }
    this.fetchMoreQues = this.fetchMoreQues.bind(this);
  }
  fetchMoreQues = (id) => {
    console.log('ID-->', id)

      axios.get(`/api/qa/id=${id}`, {
        params: {
          product_id: id,
          previousQuesId: this.props.quesId
        }
      })
        .then(data => {
          this.setState({
            quesAns : data.data
          })
        })
        .catch(error => {
          console.error(error)
        })

  }
  render(){
      console.log('More Questions--->', this.props)
      if(this.state.quesAns.length > 0) {
        console.log('Testing---------')
        return (
          <ViewQuestion quesAnsLists={this.state.quesAns}/>
        )
      }
    return (

      <div className='moreQuestion'>
        <button type="submit" onClick={()=>this.fetchMoreQues(this.props.productId)}>MORE ANSWERED QUESTIONS</button>
      </div>
    );
  }
}

export default MoreQuestion;