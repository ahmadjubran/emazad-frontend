import React, { useState, useEffect } from "react";

import {
    VStack,
    Text,
    Heading,
    Alert,
    AlertIcon,
    FormControl,
    Input,
    Button,
    Flex,
    InputLeftElement,
    InputGroup,
    Textarea,
    FormHelperText,
    Select,
    useToast,
    Grid,
    GridItem,
    Box,
    HStack,
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

  const error = useSelector((state) => state.item.error);
  const loading = useSelector((state) => state.item.loading);
  const userId = useSelector((state) => state.auth.user.id);
  const toast = useToast();

  const date = new Date().toISOString().slice(0, 16);  

  // states:

  const [minEndDate, setMinEndDate] = useState();
  const [step, setStep] = useState(1);
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

  const backButtonStyle = {
    width: "90%",
    height: "3.1rem",
    borderRadius: "10px",
    backgroundColor: "#3182CE",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.2rem",
  };

  // functions:

  function handleEndDate(e) {
    setMinEndDate(e.target.value);
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    const imageURL = await uploadItemImage();
    console.log(imageURL);
    addItem(dispatch, e, imageURL, userId)
  }

  function handleChange(e) {
    e.preventDefault();
    setStep(step + 1);

        console.log(categories.categories)
    setFormData({...formData, [e.target[0].name]: e.target[0].value});
    
    console.log(formData)
  };

   function handleStep2(e) {
    e.preventDefault();
    setStep(step + 1);
    console.log(categories.categories)
    setFormData({...formData, [e.target[0].name]: e.target[0].value, [e.target[1].name]: e.target[1].value, [e.target[2].name]: e.target[2].value});
    console.log(e.target)
    console.log(formData)
   
  };

  function handleStep3 (e) {
    e.preventDefault();
    console.log(e.target[0].value, 'whattttttt')
    setStep(step + 1);
    console.log(categories.categories)

     const data = {...formData, [e.target[0].name]: e.target[0].value, [e.target[1].name]: e.target[1].value, [e.target[2].name]: e.target[2].value};
    finishSubmission(data)
  } 

  
  function finishSubmission (data) {
    addItem(dispatch, data, '' ,userId)
  } 


  useEffect(() => {
    console.log(formData)
    console.log(step)
  }, [formData])

  return (
   
    <Flex justify="center" align='center' 
    web
    
    bgGradient="linear-gradient(90deg, blue.600 0%, blue.500 35%, blue.400 100%)"
    > 
    <Flex  direction="column" p="6" justifyContent="center" align='center'  
    gap='6' boxShadow='lg' w='75%' h='70vh' my ='14px'
    className="glassBG"   
    >
      
    {step == 1 &&
    <>
    <Text bg='black' opacity='0.84' color='white' p='10px' fontSize={{base:'14px', md:'20px', lg:'24px'}} borderRadius='8px' >What do you want to sell?</Text>
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
          <Text p='2px' borderRadius="lg" key={index} w={{ base: "65px", md: "100px", lg: "200px" }} fontSize = {{ base: "10px", md: "16px", lg: "20px" }}
> {category.display} </Text>  
              </Center>
            </Box>
            </form> 
        </GridItem>  ))}
      
    </Grid>
    </>}
    {step == 2 &&
    <Box justify={'center'}>
        <Text m='10px' p='8px' color='black' fontSize={{base:'14px', md:'20px', lg:'20px'}} fontWeight='bold'>Select a suitable subcategory for your product</Text>
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
      <Input type="text" name="itemTitle" placeholder="Title" variant="auth" m='4px' w='100%' bg='white'/>
      <Textarea type="text" name="itemDescription" placeholder="Description" variant="auth" m='4px' w='100%'/>
      <Select name="itemCondition" variant="auth" m='4px' w='100%'bg='white'>
                <option disabled>Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </Select>
              <FormControl pb="1em">
              <Input type="file" name="itemImage" multiple="multiple" placeholder="itemImage" variant="auth" m='4px' w='100%'/>
              <FormHelperText textAlign="left" m='4px' w='100%'>You can upload up to 8 images.</FormHelperText>
              </FormControl>
              <Flex justify={'center'} gap={4} m='1rem'>
        <Button onClick={() => setStep(step-1)} style={buttonStyle}> Back </Button>
        <Button type="submit" style={buttonStyle}>Next</Button>
        </Flex> 
              
              
      </form>
      </Box>}
      {step == 4 &&
      <Box>
        <form onSubmit={(e) => handleStep3(e)}> 

        <Text>Set an initial price</Text>
        <FaDollarSign />
        <Input type="number" name="initialPrice" placeholder="initialPrice" variant="auth" />
        <Text>Start Date</Text>
        <Input type="datetime-local" name="startDate" placeholder="startDate" min={date} variant="auth" onChange={(e) => handleEndDate(e)}/>
        <Text>End Date</Text>
        <Input type="datetime-local" name="endDate" placeholder="endDate" min={minEndDate} variant="auth" />
        <Flex justify={'center'} gap={4} m='1rem'>
        <Button onClick={() => setStep(step-1)} bg={'blue.500'} color='white' _hover={{backgroundColor:'white', color:'blue.500'}} > Back </Button>
        <Button type="submit" bg={'blue.500'} color='white' _hover={{backgroundColor:'white', color:'blue.500'}}>Add Auction</Button>
        </Flex> 

        </form>


      </Box>}
      <HStack gap='4px'> 
      
</HStack>
  </Flex>
  </Flex>
  );
}


export default AddItem;




/*


import React, {useEffect, useState} from "react";
import {
  Box,
  Flex,
  Heading,
  Button,
  InputGroup,
  Textarea,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Link,
  Switch,
  Text,
  Icon,
  DarkMode,
  FormHelperText,
  Select,
  InputLeftElement,
  Alert,
  VStack,
  AlertIcon,
  Center,
  Grid,
  GridItem,
  useToast
} from "@chakra-ui/react";
import categories from "./categories.json";

import './style.css'
import { FaDollarSign } from "react-icons/fa";
export default function NewForm() {

  const [step, setStep] = useState(1);
  const date = new Date().toISOString().slice(0, 16);  
  const [minEndDate, setMinEndDate] = useState();

  function handleEndDate(e) {
    setMinEndDate(e.target.value);
  };

  const [formData , setFormData] = useState({
    category: '',
    subcategory: '',
    itemTitle: '',
    itemDescription: '',
    itemCondition: '',
    itemImage: '',
    initialPrice: '',
    startDate: '',
    endDate: '',
  });

  function handleChange(e) {
    e.preventDefault();
    setStep(step + 1);
    console.log(e.target[0].name, e.target[0].value)
    console.log(categories.categories)
    setFormData({...formData, [e.target[0].name]: e.target[0].value});
    console.log(formData)
  };


useEffect(() => {
  console.log(formData)
}, [formData])
  return (
    <Flex justify="center" align='center'  className="gridentBG"> 
    <Flex  direction="column" p="6" justifyContent="center" align='center'  
    gap='6' boxShadow='lg' w='75%' h='70vh' my ='14px'
    className="glassBG"   
    >
      
    {step == 1 &&
    <>
    <Text >What do you want to sell?</Text>
    <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
    {categories.categories.map((category, index) => (

        <GridItem >
          <form onSubmit={(e) => handleChange(e)}>
            
            <Input type="hidden" name="category" value={category.name} key={category.key}/>
            <Box
              w={{ base: "118px", md: "170px", lg: "225px" }}
              h={{ base: "80px", md: "118px", lg: "175px" }}
              bgRepeat="no-repeat"
              bgSize="cover"
              borderRadius="lg"
              name="electronics"
              overflow="hidden"
              type="submit"
              opacity="0.9"
              transition= "all 0.3s ease-out"
               _hover={{opacity: "1", p:'8px'}}
              as="button"
               >
              <Center
                w="100%"
                h="100%"
                bgImage={`url(${category.image})`}
                color="white"
                fontSize="2xl"
                fontWeight="bold"
                textTransform="capitalize"
              >
          <Text bg='black' opacity='0.9' p='2px' borderRadius="lg"> {category.display} </Text>  
              </Center>
            </Box>
            </form> 
        </GridItem>  ))}
      
    </Grid>
    </>}
    {step == 2 &&
    <Box>
        <Text m='10px'>Select a suitable subcategory for your product</Text>
      <form onSubmit={(e) => handleChange(e)}>
      <Select name='subcategory' >
      {categories.categories.map((category, index) => (
        category.name == formData.category && category.subcategories.map((subcategory, index) => (
         
              <option value={subcategory}>{subcategory}</option>
            
        ))
        
        ))}
        </Select>
        <Button type="submit"  >Next1</Button>
      </form> 
      
      
      </Box>}
    {step == 3 &&
    <Box>
      <Text>Describe your product</Text>
      <Input type="text" name="itemTitle" placeholder="Title" variant="auth" m='4px' w='100%'/>
      <Textarea type="text" name="itemDescription" placeholder="Description" variant="auth" m='4px' w='100%'/>
      <Select name="itemCondition" variant="auth" m='4px' w='100%'>
                <option disabled>Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </Select>
              <FormControl pb="1em">
              <Input type="file" name="itemImage" multiple="multiple" placeholder="itemImage" variant="auth" m='4px' w='100%'/>
              <FormHelperText textAlign="left" m='4px' w='100%'>You can upload up to 8 images.</FormHelperText>
              </FormControl>

      </Box>}
      {step == 4 &&
      <Box>
        <Text>Set an initial price</Text>
        <FaDollarSign />
        <Input type="number" name="initialPrice" placeholder="initialPrice" variant="auth" />
        <Text>Start Date</Text>
        <Input type="datetime-local" name="startDate" placeholder="startDate" min={date} variant="auth" onChange={(e) => handleEndDate(e)}/>
        <Text>End Date</Text>
        <Input type="datetime-local" name="endDate" placeholder="endDate" min={minEndDate} variant="auth" />


      </Box>}
      <HStack gap='4px'> 
      {step > 1 && 
      <Button onClick={() => setStep(step-1)}> Back </Button>
      }
      {step > 1 && step < 4 && 
      <> 
      <Button onClick={(e) => handleChange (e)}> Next </Button>
      </>
      }
      {step == 4 && 
      <Button onClick={() => setStep(step+1)}> Add Auction </Button>
      }
</HStack>
  </Flex>
  </Flex>
  );
}




.gridentBG{
    background: linear-gradient(90deg, #3182ce 50%, #7078ee 100%);
    animation: gradientBG 10s ease infinite;
}

// .glassBG {
//    /* important */
// /* From https://css.glass */
// background: rgba(255, 255, 255, 0.56);
// border-radius: 16px;
// box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
// backdrop-filter: blur(19px);
// -webkit-backdrop-filter: blur(19px);
// border: 1px solid rgba(255, 255, 255, 0.27);
// }



// OLD FORM: 

// <Flex direction={{ base: "column", md: "row" }} justify="center" align="center" w="100%" h="70vh">
    
// <VStack
//   w="100%"
//   h="100%"
//   justify="center"
//   align="center"
//   bgSize="cover"
//   bgPosition="center"
//   bgRepeat="no-repeat"
// >
//   <Link to={`/profile/${userId}`}>
//      <Button>Back to Profile</Button>
//   </Link>
//   <Heading textStyle="h1" mb="1em">
//     Create Item
//   </Heading>

//   <form onSubmit={(e) => handleSubmit(e)}>
//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Input type="text" name="itemTitle" placeholder="Title" variant="auth" />
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Textarea type="text" name="itemDescription" placeholder="itemDescription" variant="auth" />
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em">
//       <InputGroup>
//         <Input type="file" name="itemImage" multiple="multiple" placeholder="itemImage" variant="auth" onChange={(e) => validateImage(e, toast)}/>
//       </InputGroup>
//       <FormHelperText textAlign="left">you can upload up to 8 images.</FormHelperText>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Select name="category" variant="auth">
//           <option disabled>Select Category</option>
//           <option value="electronics">Electronics</option>
//           <option value="clothes">Clothes</option>
//           <option value="realestate">Real Estate</option>
//           <option value="pets">Pets</option>
//           <option value="vehicles">Vehicles</option>
//           <option value="others">Others</option>
//         </Select>
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Input type="text" name="subCategory" placeholder="subCategory" variant="auth" />
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Select name="itemCondition" variant="auth">
//           <option disabled>Select Condition</option>
//           <option value="New">New</option>
//           <option value="Used">Used</option>
//         </Select>
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <InputLeftElement children={<FaDollarSign />} />
//         <Input type="number" name="initialPrice" placeholder="initialPrice" variant="auth" />
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Input type="datetime-local" name="startDate" placeholder="startDate" min={date} variant="auth" onChange={(e) => handleEndDate(e)}/>
//       </InputGroup>
//     </FormControl>

//     <FormControl pb="1em" isRequired>
//       <InputGroup>
//         <Input type="datetime-local" name="endDate" placeholder="endDate" min={minEndDate} variant="auth" />
//       </InputGroup>
//     </FormControl>

//     {error && (
//       <Alert status="error" variant="left-accent" mb="1em">
//         <AlertIcon />
//         {error}
//       </Alert>
//     )}

//     <Text>{loading ? "Loading..." : ""}</Text>

//     <Button variant="primary" type="submit" mb="1rem">
//       Add Item
//     </Button>

  
//           </form>
//       </VStack>
//   </Flex>
