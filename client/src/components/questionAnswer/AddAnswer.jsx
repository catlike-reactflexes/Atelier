const React = require('react');

class AddAnswer extends React.Component {
  constructor(props){
    super(props);
    this.submitAnswer= this.submitAnswer.bind(this);
  }
  submitAnswer = ()=> {
    console.log('submit answer');
    this.props.onClose();
  }

  render(){
    if(!this.props.open) return null;
    return (
      <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_Q_STYLES}>
        <p>Submit your Answer</p>
        <button onClick={this.submitAnswer}>Submit Answer</button>
      </div>
      </>
    );
  }
}
const MODAL_Q_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  zIndex: 1000
}
const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .4)',
  zIndex: 1000
}
export default AddAnswer;