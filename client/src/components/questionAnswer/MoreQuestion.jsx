const React = require('react');


class MoreQuestion extends React.Component{
  constructor(props){
    super(props);
  }
  render(){


    return (

      <div className='moreQuestion'>
        <button type="submit">MORE ANSWERED QUESTIONS</button>
      </div>
    );
  }
}

export default MoreQuestion;