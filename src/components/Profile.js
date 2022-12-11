import '../styles/Profile.css'
import { FiMail } from 'react-icons/fi'
import { FiSettings } from 'react-icons/fi'
import { ImHammer2 } from 'react-icons/im'
import { MdSell } from 'react-icons/md'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { MdReportGmailerrorred } from 'react-icons/md'

export default function Profile() {
  // if the user is visitng his own profile, show:
  // favorite auctions, favorite sellers and remove the report button, email, phone number 
  // if the user is visiting another user profile, show:
  // the report button
  return (

    
    <div className='profile'>
      <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"></link>
      <div className='profile-img'>
        <img src='https://cours-informatique-gratuit.fr/wp-content/uploads/2017/10/avatar.png' width='190px' alt='profile' />
      </div>
      <div className='profile-info'>
        <h1>John Doe</h1>
        <div className="user-activity">
          <button className="user-auctions"> <MdSell /> Auctions</button>
          <button className="user-bids"> <ImHammer2 /> Bids</button>
          {/* if it is not the user own page, render the report button */}
          <button className="user-settings"> <FiSettings /> Settings</button>


        </div>
        <div className="user-details">
          <div> <FiMail size='20px' /> Email </div>
          <div> <BsFillTelephoneFill size='20px' /> Phone Number </div>
          <div> Followers </div>
          <div> Following </div>
          <div> Favorite Auctions </div>

        </div>
        <button className="report-user-button"> <MdReportGmailerrorred size='20px' /> Report User </button>
        <div className='review-container'>
          <div className='stars'>
            <form action="">
              <input className="star star-5" id="star-5-2" type="radio" name="star" />
              <label className="star star-5" htmlFor="star-5-2">  </label>
              <input className="star star-4" id="star-4-2" type="radio" name="star" />
              <label className="star star-4" htmlFor="star-4-2"></label>
              <input className="star star-3" id="star-3-2" type="radio" name="star" />
              <label className="star star-3" htmlFor="star-3-2"></label>
              <input className="star star-2" id="star-2-2" type="radio" name="star" />
              <label className="star star-2" htmlFor="star-2-2"></label>
              <input className="star star-1" id="star-1-2" type="radio" name="star" />
              <label className="star star-1" htmlFor="star-1-2"></label>
              <div className="rev-box">
                <textarea className="review" col="30" name="review"></textarea>
                <label className="review" htmlFor="review">Breif Review</label>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>

  )
}

