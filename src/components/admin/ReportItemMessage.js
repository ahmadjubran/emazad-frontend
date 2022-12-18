import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Flex,

} from '@chakra-ui/react'
function ReportItemMessage(props) {
    return (
        <>
            <Drawer
                isOpen={props.isOpen}
                placement='right'
                onClose={props.onClose}
                finalFocusRef={props.btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Report Messages</DrawerHeader>

                    <DrawerBody>
                        {
                            props.reportItem.map((message, index) => {
                                return (
                                    <Flex key={index} direction="column" mb="15px">
                                        <Text fontSize="xl" color="gray.700" fontWeight="bold">
                                            From : {message.User.fullName}
                                        </Text>
                                        <Text fontSize="md" fontWeight="bold">
                                            title : {message.reportTitle} ({message.reportReason})
                                        </Text>
                                        <Text fontSize="md" fontWeight="normal">
                                            {message.reportMessage}
                                        </Text>
                                    </Flex>
                                )
                            }
                            )
                        }
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default ReportItemMessage;