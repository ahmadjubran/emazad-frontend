import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
import { selectUser } from '../store/features/authSlicer'
import '../styles/Profile.css'
import { FiMail, FiSettings } from 'react-icons/fi'
import { ImHammer2 } from 'react-icons/im'
import { BsFillTelephoneFill, BsThreeDotsVertical, BsChatSquareQuote, BsFillPersonFill } from 'react-icons/bs'
import { MdReportGmailerrorred, MdSell, MdReportProblem, MdOutlineFavorite, MdReviews } from 'react-icons/md'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    IconButton,
    Button,
    Stack,
    Avatar,
    Flex,
    HStack,
    useDisclosure
} from '@chakra-ui/react';




export default function Profile() {

    // Routes:
    // router.get("/profile/:id", bearerAuth, getUserProfile);
    // router.put("/profile/:id", uploadUserImg, bearerAuth, updateUserProfile);

    const dispatch = useDispatch()
    // const user = useSelector(selectUser)
    const { user } = useSelector(state => state.auth)
    const { isOpen, onOpen, onClose } = useDisclosure();

    //States:

    const [userName, setUserName] = useState('Abu Al Shabab')
    const [userEmail, setUserEmail] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userGender, setUserGender] = useState('')
    const [userBirthDate, setUserBirthDate] = useState('')
    const [userImage, setUserImage] = useState('')


    //Functions:

    // get profile data from backend 1
    const getProfileData = async () => {
        const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/1`, {
            // there is a problem with the server, it doesn't let users to get data without authorization
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        setUserName(res.data.userName)
        setUserEmail(res.data.email)
        setUserPhone(res.data.phone)
        setUserImage(res.data.image)
        setUserBirthDate(res.data.birthDate)
        setUserPhone(res.data.phone)
        setUserGender(res.data.gender)


    }
    // to get the sold auctions posted by the user 1
    const userSoldAuctions = async () => {
        const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userSoldItems/1`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    // to get the active auctions posted by the user 1

    const userActiveAuctions = async () => {
        const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userActiveItems/1`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    // to get the bids made by the user 1


    const userBids = async () => {
        const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userEngagedItems/1`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    // to get user 1's reviews
    const userReviews = async () => {
        const res = await axios.get(`${process.env.REACT_APP_HEROKU_API_KEY}/userRating/1`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        axios.put(`${process.env.REACT_APP_HEROKU_API_KEY}/profile/1`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                setUserImage(res.data.image)
            })
            .catch(err => console.log(err))
    }



    return (
        <div className='profile'>
            <link rel="stylesheet" href="//netdna.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css"></link>
            <div className='profile-img'>
                <Avatar src={userImage} width='190px' height='190px' alt='profile' cursor={'pointer'} style={{ borderRadius: '50%' }} as={Button} onClick={(e) => handleImageUpload} />
            </div>
            <button onClick={getProfileData}> Get Data </button>
            <div className='profile-info'>
                <h1>{userName}</h1>
                <HStack>
                    <Button className="user-auctions"> <MdSell /> Auctions</Button>
                    <Button className="user-bids" width='112.31px'> <ImHammer2 size='18px' /> Bids </Button>
                    <Button className="user-settings"> <MdReviews /> Reviews </Button>


                    <Flex justifyContent="center" mt={4}>
                        <Popover placement="bottom" isLazy>
                            <PopoverTrigger>
                                <IconButton
                                    aria-label="More server options"
                                    icon={<BsThreeDotsVertical />}
                                    variant="solid"
                                    w="fit-content"
                                />
                            </PopoverTrigger>
                            <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
                                <PopoverArrow />
                                <PopoverBody>
                                    <Stack>
                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            rightIcon={<BsChatSquareQuote />}
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            fontSize="sm">
                                            Message
                                        </Button>
                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            rightIcon={<MdOutlineFavorite />}
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            fontSize="sm">
                                            Favorite Auctions
                                        </Button>
                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            rightIcon={<FiSettings />}
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            fontSize="sm" >
                                            Settings</Button>

                                        <Button
                                            w="194px"
                                            variant="ghost"
                                            rightIcon={<MdReportProblem />}
                                            justifyContent="space-between"
                                            fontWeight="normal"
                                            colorScheme="red"
                                            fontSize="sm">
                                            Report User
                                        </Button>
                                    </Stack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>



                </HStack>
                <div className="user-details">
                    <div> <FiMail size='20px' /> {userEmail} </div>
                    <div> <BsFillTelephoneFill size='20px' /> {userPhone} </div>
                    <div> <BsFillPersonFill size='20px' /> {userGender} </div>
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

