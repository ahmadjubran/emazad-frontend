import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  // MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { BiDollar } from "react-icons/bi";
import { BsFillCalendarCheckFill, BsFillTelephoneFill } from "react-icons/bs";
import { FaBirthdayCake, FaPlus, FaStar } from "react-icons/fa";
import { ImHammer2 } from "react-icons/im";
import {
  IoAddCircle,
  IoAlarmSharp,
  IoBagCheck,
  IoEllipsisHorizontalSharp,
  IoEllipsisVertical,
  IoHeart,
  IoStar,
  IoStarHalf,
  IoStarOutline,
} from "react-icons/io5";

import { MdReportProblem } from "react-icons/md";
import { TfiEmail } from "react-icons/tfi";

import EditProfileModal from "./EditProfileModal";
import ProfileItems from "./ProfileItems";

import {
  getProfileActiveItems,
  getProfileEngagedItems,
  getProfileFavoriteItems,
  getProfileRatingItems,
  getProfileSoldItems,
  getProfileStandByItems,
  getProfileWonItems,
  getUserProfile,
} from "../../store/actions/profileActions";
import { handleRatingFromProfile } from "../../store/actions/ratingActions";

export default function Profile() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { id } = useParams();
  const { userProfile, activeItems, standByItems, soldItems, wonItems, engagedItems, favoriteItems, userRating } =
    useSelector((state) => state.profile);

  useEffect(() => {
    getUserProfile(dispatch, id);
    getProfileRatingItems(dispatch, id);
    getProfileActiveItems(dispatch, id);
  }, [dispatch, id]);

  const renderStars = (rating) => {
    const rated =
      userRating.rating &&
      userRating.rating.find((rating) => Number(rating.userId) === Number(localStorage.getItem("userID")));
    if (rated) rating = rated.rating;
    const stars = [];
    let star;
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) star = IoStar;
      else if (i === Math.ceil(rating) && !Number.isInteger(rating)) star = IoStarHalf;
      else star = IoStarOutline;

      stars.push(
        <Box
          key={i}
          as={star}
          color={rated && rated.rating >= i ? "blue.500" : "gray.500"}
          _hover={{ color: "blue.300" }}
          display="inline"
          cursor="pointer"
          onClick={() => handleRatingFromProfile(dispatch, i, id, userRating.rating, toast)}
        />
      );
    }
    return stars;
  };

  return (
    // for background color
    <VStack bg="gray.100" w="100%" h="100%">
      <VStack w="80%" h="100%">
        <Text fontSize="5xl" fontWeight="bold" color="blue.500" mb="12" textTransform="uppercase">
          Profile
        </Text>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={20}
          w="100%"
          h="100%"
          bg="gray.200"
          borderRadius="2xl"
          boxShadow="md"
          border="1px solid"
          borderColor="gray.400"
          py="12"
        >
          <Flex w="100%" h="100%" justify={{ base: "center", md: "right" }} alignItems="center">
            <Image
              src={userProfile.image}
              alt="profile image"
              w="200px"
              h="200px"
              objectFit="cover"
              borderRadius="3xl"
              border="1px solid"
              borderColor="gray.400"
              boxShadow="dark-lg"
            />
          </Flex>

          <VStack align="left">
            <HStack>
              <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
                {" "}
                {userProfile.fullName}
              </Text>
              <Text color="gray.500"> ({userProfile.userName})</Text>

              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<IoEllipsisVertical />}
                  variant="none"
                  fontSize="xl"
                  _hover={{ color: "blue.500", bg: "gray.200" }}
                />
                <MenuList
                  bg="gray.200"
                  color="gray.700"
                  borderRadius="lg"
                  border=" 1px"
                  borderColor="gray.400"
                  shadow="lg"
                >
                  {userProfile.id === Number(localStorage.getItem("userID")) && (
                    <MenuItem as={EditProfileModal} user={userProfile} />
                  )}

                  <MenuItem
                    w="100%"
                    _hover={{ color: "blue.600", bg: "gray.300" }}
                    alignItems="center"
                    justifyContent="left"
                    borderRadius="0"
                    fontSize="sm"
                    fontWeight="normal"
                    bg="gray.200"
                  >
                    <MdReportProblem />
                    <span style={{ marginLeft: "0.6rem" }}>Report User</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            <HStack>
              <TfiEmail color="rgb(49,130,206)" />
              <Text> {userProfile.email}</Text>
            </HStack>

            <HStack>
              <BsFillTelephoneFill color="rgb(49,130,206)" />
              <Text>+962 {userProfile.phoneNumber && userProfile.phoneNumber.slice(1)}</Text>
            </HStack>

            <HStack>
              <FaBirthdayCake color="rgb(49,130,206)" />
              <Text>{userProfile.birthDate}</Text>
            </HStack>

            <HStack>
              <FaStar color="rgb(49,130,206)" />
              <Box fontSize="sm">
                {renderStars(userRating.averageRating)} ({userRating.countRating})
              </Box>
            </HStack>

            <HStack>
              <BsFillCalendarCheckFill color="rgb(49,130,206)" />
              <Text>{`Joined in ${userProfile.createdAt && userProfile.createdAt.slice(0, 10)}`}</Text>
            </HStack>
          </VStack>
        </Grid>
      </VStack>

      <Tabs isFitted variant="enclosed-colored" colorScheme="blue" w="80%">
        <TabList>
          <Tab gap="3">
            {" "}
            <IoAddCircle size="1.5rem" /> Create a New Auction
          </Tab>
          <Tab onClick={() => getProfileActiveItems(dispatch, id)} gap="3">
            <ImHammer2 /> Active Items
          </Tab>
          <Tab onClick={() => getProfileStandByItems(dispatch, id)} gap="3">
            <IoAlarmSharp /> Standby Items
          </Tab>
          <Tab onClick={() => getProfileSoldItems(dispatch, id)} gap="3">
            <BiDollar />
            Sold Items
          </Tab>
          <Tab onClick={() => getProfileWonItems(dispatch, id)} gap="3">
            <IoBagCheck />
            Won Items
          </Tab>
          <Tab onClick={() => getProfileEngagedItems(dispatch, id)} gap="3">
            <IoEllipsisHorizontalSharp />
            Engaged Items
          </Tab>
          <Tab onClick={() => getProfileFavoriteItems(dispatch, id)} gap="3">
            <IoHeart />
            Favorite Items
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Link to="/additem">
              <Button
                p="0px"
                bg="transparent"
                border="1px solid lightgray"
                borderRadius="15px"
                minHeight={{ sm: "200px", md: "100%" }}
                height="300px"
                w="100%"
              >
                <Flex direction="column" justifyContent="center" align="center">
                  <Icon as={FaPlus} fontSize="lg" mb="12px" />
                  <Text fontSize="lg" fontWeight="bold">
                    Start a New Auction
                  </Text>
                </Flex>
              </Button>
            </Link>
          </TabPanel>

          <TabPanel>
            <ProfileItems items={activeItems} />
          </TabPanel>

          <TabPanel>
            <ProfileItems items={standByItems} />
          </TabPanel>

          <TabPanel>
            <ProfileItems items={soldItems} />
          </TabPanel>

          <TabPanel>
            <ProfileItems items={wonItems} />
          </TabPanel>

          <TabPanel>
            <ProfileItems items={engagedItems} />
          </TabPanel>

          <TabPanel>
            <ProfileItems items={favoriteItems.map((item) => item.Item)} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  );
}
