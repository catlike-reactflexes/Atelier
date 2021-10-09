import React from 'react'
import CharBar from './CharBar.jsx'

class CharBars extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      options: {
        Size: ['Too small', '1⁄2 a size too small', 'Perfect', '1⁄2 a size too big', 'Too wide'],
        Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
        Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect'],
        Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
        Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
        Fit: ['Runs Tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
      },

    }
  }

  render() {
    const options = this.state.options
    return(
      <div className = 'charBarsContainer'>
        {this.props.reviewChars && Object.keys(this.props.reviewChars)
          .map(
            (key) => <CharBar
              key={key}
              characteristic={key}
              options={options[key]}
              point={this.props.reviewChars[key].value} />,
        )}
      </div>
    )
  }
}

  export default CharBars