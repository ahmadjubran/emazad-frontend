import React, { useState, useEffect } from "react";

import {
    Text,
    FormControl,
    Input,
    Button,
    Flex,
    Textarea,
    FormHelperText,
    Select,
    useToast,
    Grid,
    GridItem,
    Box,
    Image,
    Center
} from "@chakra-ui/react";

import categories from "../../assets/categories.json";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../../store/actions/itemActions";
import { FaDollarSign } from "react-icons/fa";
import './NewItemForm.css';
import { validateImage, uploadItemImage } from "../../store/actions/itemActions";
import { Link } from "react-router-dom";

function AddItem() {
  const dispatch = useDispatch();

  // const error = useSelector((state) => state.item.error);
  // const loading = useSelector((state) => state.item.loading);
  const userId = useSelector((state) => state.auth.user.id);
  const toast = useToast();

  const date = new Date().toISOString().slice(0, 16);  

  // states:

  const [minEndDate, setMinEndDate] = useState();
  const [step, setStep] = useState(1);
  const [previewImage, setPreviewImage] = useState();
  const [imageURL, setImageURL] = useState();
  const [formData , setFormData] = useState({
    category: '',
    subcategory: '',
    itemTitle: '',
    itemDescription: '',
    itemCondition: '',
    itemImage: '',
    initialPrice: 0,
    startDate: '',
    endDate: '',
  });

  const buttonStyle = {
    width: "90%",
    height: "3.1rem",
    borderRadius: "10px",
    backgroundColor: "#3182CE",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  // functions:

  function handleImageChange(e) {
    e.preventDefault();
    validateImage(e, toast);
    const files = Array.from(e.target.files);
    setPreviewImage(files.map((file) => URL.createObjectURL(file)));
  }

  function handleEndDate(e) {
    setMinEndDate(e.target.value);
  };

  function handleChange(e) {
    e.preventDefault();
    setStep(step + 1);
    setFormData({...formData, [e.target[0].name]: e.target[0].value});
  };

   async function handleStep2(e) {
    e.preventDefault();
    const imageURL = await uploadItemImage();
    setImageURL(imageURL)
    setStep(step + 1);
    setFormData({...formData, [e.target[0].name]: e.target[0].value, [e.target[1].name]: e.target[1].value, [e.target[2].name]: e.target[2].value});
  };

  function handleStep3 (e) {
    e.preventDefault();
    setStep(step + 1);
     const data = {...formData, [e.target[0].name]: e.target[0].value, [e.target[1].name]: e.target[1].value, [e.target[2].name]: e.target[2].value};
    finishSubmission(data)
  } 

  
  function finishSubmission (data) {
    setStep(step + 1);
    addItem(dispatch, data, imageURL ,userId, toast)
  } 


  useEffect(() => {
    
  }, [formData])

  return (
   
    <Flex justify="center" align='center' bgGradient="linear-gradient(90deg, blue.600 0%, blue.500 35%, blue.400 100%)"> 
    <Flex  direction="column" p="6" justifyContent="center" align='center'  
    gap='6' boxShadow='lg' w='75%' h='70vh' my ='14px'
    className="glassBG"   
    >
      
    {step == 1 &&
    <>
    <Text opacity='0.84' color='gray.700' fontWeight="bold" p='10px' fontSize={{base:'14px', md:'20px', lg:'32px'}} borderRadius='8px' >What do you want to sell?</Text>
    <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
    {categories.categories.map((category, index) => (

        <GridItem >
          <form onSubmit={(e) => handleChange(e)}>
            
            <Input type="hidden" name="category" value={category.name} />
            <Box
              w={{ base: "100px", md: "170px", lg: "250px" }}
              h={{ base: "80px", md: "118px", lg: "175px" }}
              bgRepeat="no-repeat"
              bgSize="cover"
              borderRadius="lg"
              name="electronics"
              overflow="hidden"
              bgImage={`url(${category.image})`}
              type="submit"
              opacity="0.92"
              transition= "all 0.2s ease-out"
               _hover={{opacity: "1"}}
              as="button"
               >
              <Center
                w="100%"
                h="100%"
                color="white"
                fontSize="2xl"
                fontWeight="bold"
                textTransform="capitalize"
                bg="rgba(0,0,0,0.5)"

              >
          <Text p='2px' borderRadius="lg" key={index} w={{ base: "65px", md: "100px", lg: "200px" }} 
          fontSize = {{ base: "10px", md: "16px", lg: "20px" }}> {category.display} </Text>  
              </Center>
            </Box>
            </form> 
        </GridItem>  ))}
      
    </Grid>
    </>}
    {step == 2 &&
    <Box justify={'center'}>
        <Text m='10px' p='8px' color='black' fontSize={{base:'14px', md:'20px', lg:'20px'}} fontWeight='bold'>Select a suitable subcategory for your product!</Text>
      <form onSubmit={(e) => handleChange(e)}>
      <Select name='subCategory' bg='white' >
      {categories.categories.map((category, index) => (
        category.name == formData.category && category.subcategories.map((subcategory, index) => (
         
              <option value={subcategory} key={index}>{subcategory}</option>
            
        ))
        
        ))}
        </Select>
        <Flex justify={'center'} gap={4} m='1rem'>
        <Button onClick={() => setStep(step-1)} style={buttonStyle} _hover={{backgroundColor:'white', color:'blue.500'}} > Back </Button>
        <Button type="submit" style={buttonStyle} _hover={{backgroundColor:'white', color:'blue.500'}}>Next</Button>
        </Flex> 

      </form> 
      
      
      </Box>}
    {step == 3 &&
    <Box >
      <Text p='8px' color='black' fontSize={{base:'14px', md:'20px', lg:'20px'}} fontWeight='bold'>Describe your product</Text>
      <form onSubmit={(e) => handleStep2(e)}> 
      <Input type="text" name="itemTitle" placeholder="Title" variant="auth" m='4px' w='100%' bg='white' required/>
      <Textarea type="text" name="itemDescription" placeholder="Description" variant="auth" m='4px' w='100%' required/>
      <Select name="itemCondition" variant="auth" m='4px' w='100%'bg='white' required>
                <option disabled>Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </Select>
              <FormControl pb="1em">
              <Input type="file" name="itemImage" multiple="multiple" placeholder="itemImage" variant="auth" m='4px' w='100%' onChange={(e) => handleImageChange(e, toast)}/>

              <FormHelperText textAlign="left" m='4px' w='100%'>You can upload up to 8 images.</FormHelperText>
              </FormControl>

              <Flex wrap="wrap" spacing="6" rounded="lg" shadow="md" bg="gray.200" p="4">
                {previewImage && previewImage.map((image, index) => (
                <Image key={index} src={image} alt="preview" w='120px' h='120px' m='4px' borderRadius="full" objectFit="cover" boxShadow='md'/>
                ))}
              </Flex>

              <Flex justify='space-evenly' my="2em" w="100%" gap={4}>
        <Button onClick={() => setStep(step-1)} style={buttonStyle}> Back </Button>
        <Button type="submit" style={buttonStyle} >Next</Button>
        </Flex> 
              
              
      </form>
      </Box>}
      {step == 4 &&
      <Box>
        <form onSubmit={(e) => handleStep3(e)}> 

        <Text>Set an initial price</Text>
        <FaDollarSign />
        <Input type="number" name="initialPrice" placeholder="initialPrice" variant="auth" required/>
        <Text>Start Date</Text>
        <Input type="datetime-local" name="startDate" placeholder="startDate" min={date} variant="auth" onChange={(e) => handleEndDate(e)} required/>
        <Text>End Date</Text>
        <Input type="datetime-local" name="endDate" placeholder="endDate" min={minEndDate} variant="auth" required/>
        <Flex justify={'center'} gap={4} m='1rem'>
        <Button onClick={() => setStep(step-1)} bg={'blue.500'} color='white' _hover={{backgroundColor:'white', color:'blue.500'}} > Back </Button>
        <Button type="submit" bg={'blue.500'} color='white' _hover={{backgroundColor:'white', color:'blue.500'}}>Add Auction</Button>
        </Flex> 

        </form>


      </Box>}
      {step == 5 &&
      <Flex>
        <Text m='10px' p='8px' color='black' fontSize={{base:'14px', md:'20px', lg:'20px'}} fontWeight='bold'>You can view your auction from your profile</Text>
        <Link to={`/profile/${userId}`}>
          <Button>View Profile</Button>
        </Link>
      </Flex>}

   
  </Flex>
  </Flex>
  );
}


export default AddItem;