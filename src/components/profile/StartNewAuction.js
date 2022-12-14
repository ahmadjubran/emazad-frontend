import {Button, Flex, Text, Icon} from '@chakra-ui/react'
import {FaPlus} from 'react-icons/fa'

export default function NewAuction(props) {

    return (
        
        <Button
        p='0px'
        bg='transparent'
        border='1px solid lightgray'
        borderRadius='15px'
        minHeight={{ sm: "200px", md: "100%" }}>
        <Flex direction='column' justifyContent='center' align='center'>
          <Icon as={FaPlus} color={props.textColor} fontSize='lg' mb='12px' />
          <Text fontSize='lg' color={props.textColor} fontWeight='bold'>
            Start a New Auction
          </Text>
        </Flex>
      </Button>
    );
}