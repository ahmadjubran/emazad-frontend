import {
  Container,
  Stack,
  Text,
  Button,
  Image,
} from '@chakra-ui/react';

import coinImage from '../../assets/img/s.webp'
import littleCoins from '../../assets/img/t.webp'
import AuctionBanner from '../../assets/img/Auction-Banner.png'
import eMazad from '../../assets/logo.png'


export default function RegisterAd() {

  function openLink (link) {
    window.open(link);
  };

  return (
    <Container maxW={'8xl'} maxH={'30rem'} bg={'rgb(31,84,105)'} 
    bgGradient='linear-gradient(90deg, rgba(31,84,105,1) 0%, rgba(24,119,140,1) 35%, rgba(105,235,250,1) 100%)'
    my={'24px'}
    borderRadius={'5px'}
    boxShadow={'2xl'}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 10, md: 32 }}
        py={{ base: 10, md: 20 }}>
        <Stack flex={1} spacing={{ base: 5, md: 10 }} align='center'>
          {/* <Image position={'relative'} src ={littleCoins} alt="littleCoins" width='50px' p='0' m='0' opacity='0.7' right='15rem'/> */}
          <Text
           as={'span'}
           position={'relative'}
           left='10rem'
          p={'45px'} color='white' textStyle={'h1'} fontSize='2.2rem' > Do you want to buy or sell at auction? </Text>
          <Button variant='light' w={'240px'} h={'55px'} left='10rem' p={'2rem'} textStyle={'h1'} fontSize='1.3rem' onClick={()=> openLink('https://emazad.netlify.app/signup')}> Join eMazad ► </Button>
          </Stack>
          <Stack flex={1} spacing={{ base: 5, md: 10 }}>
            {/* <Image src={AuctionBanner} alt="AuctionBanner" width='500px'/> */}
          <Image src={coinImage} alt="coin" width='500px'/>
          </Stack>
          </Stack>

    </Container>
  )
}

//  background: rgb(31,84,105);
// background: linear-gradient(90deg, rgba(31,84,105,1) 0%, rgba(24,119,140,1) 35%, rgba(105,235,250,1) 100%);


// grey background
/* <Container maxW={'8xl'} maxH={'30rem'} bg={'rgb(176,174,174)'} 
bgGradient='linear-gradient(61deg, rgba(176,174,174,1) 0%, rgba(237,237,237,1) 100%)' */