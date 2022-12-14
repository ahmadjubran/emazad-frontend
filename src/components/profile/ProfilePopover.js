import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody, Button, Stack, IconButton} from '@chakra-ui/react'
import { BsThreeDotsVertical, BsChatSquareQuote } from 'react-icons/bs';
import {MdOutlineFavorite, MdReportProblem} from 'react-icons/md';
import {FiSettings} from 'react-icons/fi';

export default function ProfilePopover() {
    return (
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
    );
}