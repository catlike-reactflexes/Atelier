import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import PhotoAns from './PhotoAns.jsx';
import ClickTracker from '../trackInteractions/ClickTracker.jsx';

class OneAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      answerHelpful: this.props.oneAnswer.helpfulness,
      answerReport : false
    }
    this.answerUpdateHelpfulness = this.answerUpdateHelpfulness.bind(this);
    // console.log('!!!!ONE ANSWER!!!!!!-->', this.props)
  }
  answerUpdateHelpfulness = (answerId,answerHelpful) => {
    this.props.postTrackInteractions('Answer helpfulness', 'Question And Answer')
    //send to API for update

    const maxHelpfulCount = this.props.oneAnswer.helpfulness + 1;

    if(this.state.answerHelpful < maxHelpfulCount) {
      // console.log('Hello-->', questionId)
      axios.put('/api/update', {
        data: {
          answerid: answerId
        }
      })
        .then(response => {
          this.setState({
            answerHelpful: this.state.answerHelpful + 1})
          })
    }
  }

  answerReport = (answerId) => {
    //user only allowed to click one time
    this.props.postTrackInteractions('Answer report', 'Question And Answer')
    if(!this.state.answerReport) {
      // console.log('Hello-->', questionId)
      axios.put('/api/report', {
        data: {
          answerid: answerId
        }
      })
        .then(response => {
          this.setState({
            questionReport: true})
          })
    }
  }
  render() {

    const {id, body, answerer_name, date, helpfulness, photos} = this.props.oneAnswer;
    const {oneQues} = this.props;

    // console.log('one answer->', this.props.photos)
    // console.log('IS PHOTO URL-->', photos.length, id)
    return (

      <div className="oneAnswer"
        onClick={()=>this.props.postTrackInteractions('Answer, 'Question And Answer')}
      >
          <div className="ans1">
            <div className='bigA'>A:</div>
            <div className="ansBody">{body}</div>
          </div>
          <div className="allPhotos">
            <div className='bigA'></div>
            <div className="by"></div>

              { (photos) && (photos.length > 0 ) ? <PhotoAns urlPhoto={photos}/> : null }

          </div>
          <div className='ans2'>
            <div className='bigA'></div>
            <div className="by">by:</div>
            <div>

              </div>
                <div className="ansName">
                      <div  style={{ fontWeight: 'bold' }}>{answerer_name}   </div>
                      <div className="date"> .    <Moment format="MMM, DD, YYYY">{date}</Moment></div>
                      <div className="helpful" > | Helpful?</div>
                      <div className="yes"
                        onClick={() => this.answerUpdateHelpfulness(id,helpfulness)} >
                          Yes ({this.state.answerHelpful})</div>
                      <div  className="report"
                            onClick={() => this.answerReport(id)}>
                               | Report
                      </div>
                </div>
            </div>

        </div>

    )
  }

}

export default ClickTracker(OneAnswer);
