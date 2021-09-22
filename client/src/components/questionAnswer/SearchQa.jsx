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
    let search = '';
    search += e.target.value
    console.log('Search--1->' , search);

    if(search.length >=3 ){
      // console.log("Search---2-->",this.state);
      // this.setState({
      //   searchBar: search
      // })
      const filteredQues = this.props.filteredQues.filter(question => {
        return (question.question_body.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      })
      console.log('Search--->', filteredQues)
      // this.props.updateQuesAns(filteredQues)
      this.props.handleQAUpdate(filteredQues)
    } else {
      this.setState({
        searchBar: ''
      })
    }
    // console.log("Search",this.state);
  }

  render() {

    return (
      <div className='searchBar'>

        <div data-testid="searchQues">
            <textarea
              type="text"
              name='searchBar'
              className='search'
              onChange={(e)=>this.props.updateQuesAns(e.target.value)}
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