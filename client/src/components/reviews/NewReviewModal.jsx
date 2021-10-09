import React from 'react'
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import Chars from './Chars.jsx'
import axios from 'axios'

class NewReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: this.props.product_id,
      chars: 50,
      rating: 0,
      doesRecommend: '',
      reviewSummary: '',
      reviewBody: '',
      reviewerName: '',
      reviewerEmail: '',
      reviewPhotos: [],
      characteristics: {}
    }
    this.countBodyChars = this.countBodyChars.bind(this)
    this.handleRec = this.handleRec.bind(this)
    this.handleBody = this.handleBody.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.handleSummary = this.handleSummary.bind(this)
    this.handleName = this.handleName.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleRec(e) {
    console.log('yes or no', e.target.value)
    this.setState({ doesRecommend: e.target.value });
  }

  handleRating(e) {
    // console.log('rating value:', e.target.value)
    this.setState({rating: e.target.value})
  }

  handleSummary(e) {
    // console.log('summary value:', e.target.value)
    this.setState({reviewSummary: e.target.value})
  }

  handleBody(e) {
    // console.log('body value: ', e.target.value)
    this.countBodyChars()
    this.setState({reviewBody: e.target.value})
  }

  handleName(e) {
    // console.log('name value: ', e.target.value)
    this.setState({reviewerName: e.target.value})
  }

  handleEmail(e) {
    // console.log('email value: ', e.target.value)
    this.setState({reviewerEmail: e.target.value})
  }

  countBodyChars(e) {
    this.setState({chars: this.state.chars - 1})
  }

  handleSubmit(e) {
    e.preventDefault()
    let options = this.state
    axios.post('/reviews', options)
      .then((res) => {
        console.log('post response:', res)
      })
      .catch((error) => {
        console.log('post error: ', error)
      })
  }

  render() {
    const { isOpen, openModal, productName } = this.props;
    if (isOpen === false) {
      return null
    } else {
      return (
        <React.Fragment>
          <div style={OVERLAY_STYLES}/>
          <form onSubmit = {this.handleSubmit} className= 'reviewForm' style={MODAL_STYLES}>
          <h4>Write your Review about the {productName}</h4>

          {/* <p className = ></p> */}
          <p>(required) Overall Rating</p>
          <span className = 'ratingNums'>1</span><span className = 'ratingNums'>2</span><span className = 'ratingNums'>3</span><span className = 'ratingNums'>4</span><span className = 'ratingNums'>5</span>
          <br></br>
          <input type = 'radio' name='rating' onChange = {this.handleRating} value={1}></input>
          <input type = 'radio' name='rating' onChange = {this.handleRating} value={2}></input>
          <input type = 'radio' name='rating' onChange = {this.handleRating} value={3}></input>
          <input type = 'radio' name='rating' onChange = {this.handleRating} value={4}></input>
          <input type = 'radio' name='rating' onChange = {this.handleRating} value={5}></input>




          <p className = 'recRadioBtns'>(required) Do you recommend this product?</p>
          <input type = 'radio' name = 'recommended' value='yes' onChange = {this.handleRec} id = 'recBtnYes'></input>
          <label for ='recBtnYes'>Yes</label>
          <input type = 'radio' name = 'recommended' value = 'no' onChange = {this.handleRec} id = 'recBtnNo'></input>
          <label for ='recBtnNo'>No</label>

          <div className={'review-modal-input'}>
          <div required>Please rate each characteristic:  </div>
          <Chars characteristic='Size' options={['A size too small', '1⁄2 a size too small', 'Perfect', '1⁄2 a size too big', 'A size too wide']}/>
          <Chars characteristic='Width' options={['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide']}/>
          <Chars characteristic='Comfort' options={['Uncomfortable', 'Slightly uncomfortable', 'OK', 'Comfortable', 'Perfect']}/>
          <Chars characteristic='Quality' options={['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect']}/>
          <Chars characteristic='Length' options={['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long']}/>
          <Chars characteristic='Fit' options={['Runs Tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long']}/>
          </div>

          <br></br>
          <br></br>
          <label for = 'reviewSummary'>type a summary here: </label>
          <input placeholder='Example: Best purchase ever!' type = 'text' onChange = {this.handleSummary}id = 'reviewSummary'></input>

          <br></br>
          <br></br>
          <label for = 'reviewBody'>(required) type review here: </label>
          <textarea placeholder='Why did you like the product or not?' id="reviewBody" cols="40" rows="5" onChange={this.handleBody}></textarea>
          <br></br>
          <i>{this.state.chars > 0 ? `Minimum required characters left: ${this.state.chars}` : 'Minimum Reached'}</i>

          <br></br>
          <br></br>
          <label for = 'reviewerName'>(required) type your username here: </label>
          <input placeholder='Example: jackson11!' onChange = {this.handleName} type = 'text' id = 'reviewerName'></input>
          <br></br>
          <i>For privacy reasons, do not use your full name or email address</i>

          <br></br>
          <br></br>
          <label for = 'reviewerEmail'>(required) type your email: </label>
          <input placeholder='Example: jackson11@email.com' onChange = {this.handleEmail} type = 'text' id = 'reviewerEmail'></input>
          <br></br>
          <i>For authentication reasons, you will not be emailed</i>

          <br></br>
          <br></br>

          {/* <button onClick={this.props.openModal(false)}></button> */}

          <div>
            <b>Upload photo (Max: 5)</b>
            <input type='file' id='photos'></input>
          </div>

          <button type='submit'>Submit</button>
          <button onClick = {() => {this.props.openModal(false)}}>Close</button>
        </form>
        </React.Fragment>
        )
    }
  }
  }

const MODAL_STYLES = {
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

export default ClickTracker(NewReviewModal);