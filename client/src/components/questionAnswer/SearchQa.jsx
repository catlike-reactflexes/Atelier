const React = require('react');
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import { FaSearchPlus} from 'react-icons/fa';

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


        <div className="search-bar">

          <textarea
            onClick={()=>this.props.postTrackInteractions('search', 'Questions and Answers')}
            type="text"
            name='searchBar'
            className='search'
            onChange={(e)=>this.props.updateQuesAns(e.target.value)}
            placeholder = 'HAVE A QUESTION? SEARCH FOR ANSWERS...'
            rows="2"
            cols="150"
          />
          <div ><FaSearchPlus color="#dcdcdc"size="30px"/></div>
        </div>


    );
  }

}

export default ClickTracker(SearchQa);