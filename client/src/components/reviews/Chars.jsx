import React from 'react';

class Chars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({selected:e.target.value})
  }

render() {
  const { characteristic, options } = this.props;
  const { selected } = this.state;
  return (
    <>
      <div className={'char-option-chosen'}>Current choice: {selected || ''}</div>
      <div className={'char-rating-container'}>
        <div className={'char-rating-title'}>{characteristic}:</div>
        {options.map((option) => <input
            key={option}
            type='radio'
            value={option}
            name={characteristic}
            checked={selected === option}
            className={[`char-rating-option-${options.indexOf(option)}`]}
            onChange={this.handleChange}
          />)}
        <div className={'char-option-indicator-0'}>{options[0]}</div>
        <div className={'char-option-indicator-1'}>{options[4]}</div>
      </div>
    </>
  );
}
}

export default Chars;