import '../../styles/Profile.css'

export default function Rating() {
    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"></link>

    return (
       
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
    )
}