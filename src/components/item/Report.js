import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useDisclosure} from '@chakra-ui/react';

export default function Report() {

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Favorite Auctions</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Text>There are no favorite auctions</Text>
      </ModalBody>
      <ModalFooter>
        <Button onClick={onClose}>Close</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>    
  )
}

