import React from 'react'
import ClickTracker from '../trackInteractions/ClickTracker.jsx';
import Chars from './Chars.jsx'

class NewReviewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: 50,
      reviewSummary: '',
      reviewBody: '',
      reviewerName: '',
      reviewerEmail: '',

    }
    this.countBodyChars = this.countBodyChars.bind(this)
  }

  countBodyChars(e) {
    // console.log('body: ' e.target.value)
    this.setState({chars: this.state.chars - 1})
  }

  render() {
    const { isOpen, openModal, productName } = this.props;
    if (isOpen === false) {
      return null
    } else {
      return (
        <React.Fragment>
          <div style={OVERLAY_STYLES}/>
          <form className= 'reviewForm' style={MODAL_STYLES}>
          <h4>Write your Review about the {productName}</h4>

          <p className = 'recRadioBtns'>Do you recommend this product?</p>
          <input type = 'radio' id = 'recBtnYes'></input>
          <label for ='recBtnYes'>Yes</label>
          <input type = 'radio' id = 'recBtnNo'></input>
          <label for ='recBtnNo'>No</label>

          <div className={'review-modal-input'}>
          <div required>Please rate each characteristic * </div>
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
          <input placeholder='Example: Best purchase ever!'type = 'text' id = 'reviewSummary'></input>

          <br></br>
          <br></br>
          <label for = 'reviewBody'>type review here: </label>
          <textarea placeholder='Why did you like the product or not?' id="reviewBody" cols="40" rows="5" onChange={this.countBodyChars}></textarea>
          <br></br>
          <i>You need need {this.state.chars} more chararacters</i>

          <br></br>
          <br></br>
          <label for = 'reviewerName'>type your username here: </label>
          <input placeholder='Example: jackson11!' type = 'text' id = 'reviewerName'></input>
          <br></br>
          <i>For privacy reasons, do not use your full name or email address</i>

          <br></br>
          <br></br>
          <label for = 'reviewerEmail'>type your email: </label>
          <input placeholder='Example: jackson11@email.com'type = 'text' id = 'reviewerEmail'></input>
          <br></br>
          <i>For authentication reasons, you will not be emailed</i>

          <br></br>
          <br></br>

          <label for ='photos'> Upload photos (5 max) </label>
          <input type ='file' id='photos'></input>
{/*
          <div>
                <div><b>Upload photo (Max: 5)</b></div>
                <input
                  type='file'
                  id='photos'
                  name='filename'
                  style={{ marginBottom: '10px' }}
                />
              </div> */}
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