// //Functions:

//   // get profile data from backend 1
//   const getProfileData = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/1`, {
//       // there is a problem with the server, it doesn't let users to get data without authorization
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     userReviews()
//     userBids()
//     userActiveAuctions()
//     setUserName(res.data.userName)
//     setUserEmail(res.data.email)
//     setUserPhone(res.data.phone)
//     setUserImage(res.data.image)
//     setUserBirthDate(res.data.birthDate)
//     setUserPhone(res.data.phoneNumber)
//     setUserGender(res.data.gender)
//     setJoinDate(res.data.createdAt)
//     profileFavoriteAuctions()


//   }
//   // to get the sold auctions posted by the user 1
//   const userSoldAuctions = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userSoldItems/1`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//   }

//   // to get the active auctions posted by the user 1

//   const userActiveAuctions = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userActiveItems/1`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     console.log(res.data)
//     setProfileActiveAuctions(res.data)
//   }

//   // to get the bids made by the user 1


//   const userBids = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userEngagedItems/1`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     console.log(res.data)
//   }

//   // to get user 1's reviews
//   const userReviews = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userRating/1`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     let averageRating = res.data.averageRating
//     averageRating = res.data.averageRating.toFixed(2)
//     setUserRating(`${averageRating}/5`)
//   }

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0]
//     const formData = new FormData()
//     formData.append('image', file)
//     axios.put(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/1`, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     })
//       .then(res => {
//         setUserImage(res.data.image)
//       })
//       .catch(err => console.log(err))
//   }

//   const profileFavoriteAuctions = async () => {
//     const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userFavorite/1`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('token')}`
//       }
//     });
//     console.log(res.data)
//   }


//   const handleRenderComponent = (e) => {
//     setRenderComponent(e.target.name)
//   }

//   useEffect(() => {
//     setRenderComponent(renderComponent)
//   }, )

//   const scrollDown = () => {
//     setRenderComponent('Auctions')
//     window.scrollTo({
//       top: 400,
//       behavior: "smooth"
//     });
//   }