export default function Profile() {
  // if the user is visitng his own profile, show:
  // favorite auctions, favorite sellers and remove the report button, email, phone number 
  // if the user is visiting another user profile, show:
  // the report button
  return (
    <div className='profile'>
      <div className='profile-img'>
        <img src='' alt='profile' />
      </div>
      <div className='profile-info'>
        <h1>John Doe</h1>
        <div className="user-activity">
          <h2 className="user-auctions">Auctions</h2>
          <h2 className="user-bids">Bids</h2>

        </div>
        <div className="user-details">
          <div> Email </div>
          <div> Phone Number </div>
          <div> Followers </div>
          <div> Following </div>
          <div> Favorite Auctions </div>

        </div>
        <button className="report-user-button"> Report User </button>
      </div>
    </div>

  )
}

