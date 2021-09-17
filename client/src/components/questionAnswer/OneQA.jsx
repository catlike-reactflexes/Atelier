const React = require('react');
import AddAnswer from './AddAnswer.jsx';

class OneQA extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOpen:false
    }
    this.setOpen = this.setOpen.bind(this);
    this.addUpdateHelpfulness = this.addUpdateHelpfulness.bind(this);
  }
  setOpen = (option) => {
    this.setState({
      isOpen: option
    })
  }
  addUpdateHelpfulness = (questionId) => {
    console.log('Hello-->', questionId)
  }

  render(){
    // console.log('OneQA -->', this.props.one);
    const {one} = this.props;
    console.log('OneQA -->', one);
    //need to revisit this key
    const answerId = [];
    for(let key in one.answers){
      // console.log('Key-->', key)
      answerId.push(key);
    }
    const answerBody = one.answers[answerId[0]].body;
    const answererName = one.answers[answerId[0]].answerer_name;


    return (
      <div className="oneQA">
        <div className="oneQuestion">
          <div className="qBody">
            <div className="bigQ">Q:</div>
            <div className="qBody1">{one.question_body}</div>
          </div>
          <div className="helpful">Helpful?</div>
          <div className="yes" onClick={() => this.addUpdateHelpfulness(one.question_id)} >Yes ({one.question_helpfulness})</div>

          <div className="AddAns">
            <div onClick={() => this.setOpen(true)}>Add Answer</div>
              {
                this.state.isOpen ?
                <AddAnswer
                  open ={this.state.isOpen}
                  onClose={() => this.setOpen(false)}/>
                : null
              }
          </div>
        </div>
        <div className="oneAnswer">
          <div className="ans1">
            <div className='bigA'>A:</div>
            <div className="ansBody">{answerBody}</div>
          </div>
          <div className='ans2'>
            <div className='bigA'></div>
            <div className="by">by:</div>
            <div className="ansName">{answererName}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default OneQA;