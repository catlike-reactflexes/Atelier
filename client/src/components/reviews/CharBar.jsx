import React from 'react'
import { FaCaretUp } from 'react-icons/fa';

class CharBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [this.props.options[0], this.props.options[2], this.props.options[4]]
    }
  }

  render() {
    const options = this.state.options
    return(
      <React.Fragment>
        <div className='charBarCharacteristic'>{this.props.characteristic}:</div>
        <div className='charBarContainer'>
        {options.map((option) => <div key={option} style={{ width: '95%', height: '10px', backgroundColor: 'gray' }} className={`charBar${options.indexOf(option)}`} />)}
        <div className='char0'>{options[0]}</div>
        <div className='char4'>{options[4]}</div>
        <FaCaretUp className='caret' style={{
          marginLeft: `${parseInt(this.props.point - 1, 10).toFixed(2) * 23}%`,
        }}/>
        </div>
      </React.Fragment>
    )
  }
}
export default CharBar