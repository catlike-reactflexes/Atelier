const React = require('react');


class SearchQa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBar: ''
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }
  handleSearchChange = (e)=> {

    this.setState({
      searchBar: e.target.value
    })
    console.log(this.state);
  }

  render() {
    return (
      <div className='searchBar'>

        <div data-testid="searchQues">
            <textarea
              type="text"
              name='searchBar'
              className='search'
              onChange={this.handleSearchChange}
              placeholder = 'HAVE A QUESTION? SEARCH FOR ANSWERS...'
              rows="5"
              cols="30"
              />
        </div>
      </div>

    );
  }

}

export default SearchQa;