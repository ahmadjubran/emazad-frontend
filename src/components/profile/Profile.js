import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useState } from 'react'
// import { selectUser } from '../../store/features/authSlicercer'
import '../../styles/Profile.css'
import { FiMail, FiSettings } from 'react-icons/fi'
import {FaPlus} from 'react-icons/fa'
import { ImHammer2 } from 'react-icons/im'
import { GiStarsStack } from 'react-icons/gi'
import { BsFillTelephoneFill, BsThreeDotsVertical, BsChatSquareQuote, BsFillPersonFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import { MdReportGmailerrorred, MdSell, MdReportProblem, MdOutlineFavorite, MdReviews, MdOutlineEmail } from 'react-icons/md'
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
  useDisclosure,
  AvatarGroup,
  Box,
  Grid,
  Icon,
  Image,
  Link,
  Switch,
  Text,
  useColorMode,
  useMediaQuery,
  useColorModeValue
} from '@chakra-ui/react';




export default function Profile() {

  // Routes:
  // router.get("/profile/:id", bearerAuth, getUserProfile);
  // router.put("/profile/:id", uploadUserImg, bearerAuth, updateUserProfile);

  const dispatch = useDispatch()
  // const user = useSelector(selectUser)
  const { user } = useSelector(state => state.auth)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLessThan768] = useMediaQuery("(max-width: 768px)");
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");

  const textColor = useColorModeValue("gray.700", "white");
  const iconColor = useColorModeValue("blue.500", "white");
  const bgProfile = useColorModeValue("hsla(0,0%,100%,.8)", "navy.800");
  const borderProfileColor = useColorModeValue("white", "transparent");
  const emailColor = useColorModeValue("gray.400", "gray.300");

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
      <button onClick={getProfileData}> Get Data </button>

      {isLessThan768 &&
        <>
          <div className='profile-img'>
            <Avatar src={userImage} width='190px' height='190px' alt='profile' cursor={'pointer'} style={{ borderRadius: '50%' }} as={Button} onClick={(e) => handleImageUpload} />
          </div>
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
          </div>
        </>}

      {isLargerThan768 &&
        <Flex
          direction={{ sm: "column", md: "row" }}
          mb='24px'
          maxH='330px'
          justifyContent={{ sm: "center", md: "space-between" }}
          align='center'
          backdropFilter='blur(21px)'
          boxShadow='0px 2px 5.5px rgba(0, 0, 0, 0.02)'
          border='1.5px solid'
          borderColor={borderProfileColor}
          bg={'#f7fafc'}
          p='24px'
          borderRadius='20px'>
          <Flex
            align='left'
            mb={{ sm: "10px", md: "0px" }}
            direction={{ sm: "column", md: "row" }}
            w={{ sm: "100%" }}
            textAlign={{ sm: "center", md: "start" }}>
            <Avatar
              me={{ md: "22px" }}
              src={userImage}
              w='180px'
              h='180px'
              borderRadius='15px'
              alt='profile' cursor={'pointer'} as={Button} onClick={(e) => handleImageUpload}
            />
            <Flex direction='column' maxWidth='100%' my={{ sm: "14px" }}>
              <Text
                fontSize={{ sm: "lg", lg: "xl" }}
                color={textColor}
                fontWeight='bold'
                ms={{ sm: "8px", md: "0px" }}>
                {userName}
              </Text>
              <Text
                fontSize={{ sm: "sm", md: "md" }}
                color={emailColor}
                fontWeight='semibold'>
                {userEmail}
              </Text>
            </Flex>
          </Flex>
          <Flex
            direction={{ sm: "column", lg: "row" }}
            w={{ sm: "100%", md: "50%", lg: "auto" }}
            alignItems="center"


          >

            <Flex
              align='center'
              w={{ sm: "100%", lg: "135px" }}
              borderRadius='8px'
              justifyContent='center'
              py='10px'
            >
              <Button> <MdSell /> Auctions</Button>
            </Flex>

            <Flex
              align='center'
              w={{ lg: "135px" }}
              borderRadius='15px'
              justifyContent='center'
              py='10px'
              mx={{ lg: "1rem" }}>

              <Button className="user-bids" width='112.31px'> <ImHammer2 size='18px' /> Bids </Button>

            </Flex>
            <Flex
              align='center'
              w={{ lg: "135px" }}
              borderRadius='15px'
              justifyContent='center'
              py='10px'>
              <Button className="user-settings"> <MdReviews /> Reviews </Button>

            </Flex>
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

        </Flex>

      }

      {/* // Personal Information of This Profile  */}


      <Grid templateColumns={{ sm: "1fr", xl: "repeat(3, 1fr)" }} gap='22px' bg={'#f7fafc'}>
        <Box p='16px'>
          <Box p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              About Abu Al Shabab
            </Text>
          </Box>


          <Box px='5px'>
            <Flex direction='column'>

              <Flex align='center' mb='20px' direction='row'>
                <GiStarsStack />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Rating: 4.92/5 (4)
                </Text>
              </Flex>

              <Flex align='center' mb='20px' direction='row'>
                <BsFillCalendarCheckFill />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  Joined in Dec 2022

                </Text>
              </Flex>

              <Flex align='center' mb='20px' direction='row'>
                <MdOutlineEmail />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  abualshabab@youth.com

                </Text>
              </Flex>


              <Flex align='center' mb='20px' direction='row'>
                <BsFillTelephoneFill />
                <Text
                  noOfLines={1}
                  fontSize='md'
                  color='gray.400'
                  fontWeight='400'>
                  +962 777 888 444

                </Text>
              </Flex>

            </Flex>
          </Box>
        </Box>


        {/* Bids Made by This Profile  */}

        <Box p='16px' my={{ sm: "24px", xl: "0px" }}>
          <Box p='12px 5px' mb='12px'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Bids made by {userName}
            </Text>
          </Box>
          <Box px='5px'>
            <Flex direction='column'>
              <Button  minW='100%'>
                Has bidden on HP Laptop 2021
              </Button>
              
            
              
            </Flex>
          </Box>
        </Box>

      </Grid>


        {/* //Auctions Posted By This Profile */}

        <Box p='16px' my='24px'>
        <Box p='12px 5px' mb='12px'>
          <Flex direction='column'>
            <Text fontSize='lg' color={textColor} fontWeight='bold'>
              Auctions
            </Text>
            <Text fontSize='sm' color='gray.400' fontWeight='400'>
              Auctions posted by {userName}
            </Text>
          </Flex>
        </Box>
        <Box px='5px'>
          <Grid
            templateColumns={{ sm: "1fr", md: "1fr 1fr", xl: "repeat(4, 1fr)" }}
            templateRows={{ sm: "1fr 1fr 1fr auto", md: "1fr 1fr", xl: "1fr" }}
            gap='24px'>
            <Flex direction='column'>
              <Box mb='20px' position='relative' borderRadius='15px'>
                <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kia_Sephia_front_20071205.jpg/640px-Kia_Sephia_front_20071205.jpg' borderRadius='15px' />
                <Box
                  w='100%'
                  h='100%'
                  position='absolute'
                  top='0'
                  borderRadius='15px'
                  bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
              </Box>
              <Flex direction='column'>
                <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  mb='10px'>
                  Kia Sivia 1999
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='20px'>
                 4 good, wakaleh.
                </Text>
                <Flex justifyContent='space-between'>
                  <Button variant='dark' minW='110px' h='36px'>
                    VIEW AUCTION
                  </Button>
                  <AvatarGroup size='xs'>
                    <Avatar name='Mahmoud'  />
                    <Avatar name='Baklulu Al Mushtari'  />
                    <Avatar name='Abu Bantaloon'  />
                    <Avatar name='Cholo' />
                  </AvatarGroup>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction='column'>
              <Box mb='20px' position='relative' borderRadius='15px'>
                <Image src='https://www.bobswatches.com/rolex-blog/wp-content/uploads/2014/05/hottest-rolex-watches-6.jpg' borderRadius='15px' width='450px' height='280px'/>
                <Box
                  w='100%'
                  h='100%'
                  position='absolute'
                  top='0'
                  borderRadius='15px'
                  bg='linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)'></Box>
              </Box>
              <Flex direction='column'>
                <Text
                  fontSize='xl'
                  color={textColor}
                  fontWeight='bold'
                  mb='10px'>
                  Real Rolex Handwatch
                </Text>
                <Text fontSize='md' color='gray.400' fontWeight='400' mb='20px'>
                  Made in 2010, in Switzerland, 100% real.
                </Text>
                <Flex justifyContent='space-between'>
                  <Button variant='dark' minW='110px' h='36px'>
                    VIEW AUCTION
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Button
              p='0px'
              bg='transparent'
              border='1px solid lightgray'
              borderRadius='15px'
              minHeight={{ sm: "200px", md: "100%" }}>
              <Flex direction='column' justifyContent='center' align='center'>
                <Icon as={FaPlus} color={textColor} fontSize='lg' mb='12px' />
                <Text fontSize='lg' color={textColor} fontWeight='bold'>
                  Start a New Auction
                </Text>
              </Flex>
            </Button>
          </Grid>
          </Box>
      </Box>


      {/* //Rating */}

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


  )
}

