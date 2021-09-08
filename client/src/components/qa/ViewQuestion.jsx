const React = require('react');
import OneQA from './OneQA.jsx';

class ViewQuestion extends React.Component{
  render(){
    return (
      <div>
        <p>View 2 Questions with 1 answer</p>
        <OneQA/>
      </div>
    );
  }
}

export default ViewQuestion;