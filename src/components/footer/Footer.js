import { Box, Button, Container, IconButton, Image, Input, SimpleGrid, Stack, Text, useToast } from "@chakra-ui/react";
import { BiMailSend } from "react-icons/bi";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

import { RiInstagramFill } from "react-icons/ri";
import footerLogo from "../../assets/img/logo/footerLogo.png";

import emailjs from "@emailjs/browser";
import { useRef } from "react";

import { useSelector } from "react-redux";
import { selectUser } from "../../store/features/authSlicer";

export default function LargeWithNewsletter() {
  const user = useSelector(selectUser);
  const toast = useToast();

  const form = useRef();

  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm("service_xq50kw5", "template_ui2hs4l", form.current, "IX5VyXcqhp-pd31y4").then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
    e.target.reset();
    toast({
      title: "You have subscribed successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  }

  return (
    <Box bg="gray.50" boxShadow={"0 0 10px 0 rgba(0,0,0,0.1)"}>
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }} spacing={8}>
          <Stack spacing={2} justify="center" align="center">
            <Link to="/" onClick={() => window.scrollTo(0, 0)}>
              <Image src={footerLogo} alt="footer-logo" w="250px" />
            </Link>
            <Text fontSize={"sm"}>© 2022 eMazad All rights reserved</Text>
            <Stack direction={"row"} spacing={3}>
              <Button label={"Facebook"} href={"#"} borderRadius="full">
                <FaFacebook />
              </Button>
              <Button label={"Twitter"} href={"#"} borderRadius="full">
                <FaTwitter />
              </Button>
              <Button label={"YouTube"} href={"#"} borderRadius="full">
                <FaYoutube />
              </Button>
              <Button label={"Instagram"} href={"#"} borderRadius="full">
                <RiInstagramFill />
              </Button>
            </Stack>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize={"lg"} mb={2}>
              Useful Links
            </Text>
            <Link to="/about" onClick={() => window.scrollTo(0, 0)}>
              About us
            </Link>
            <Link to="/contact" onClick={() => window.scrollTo(0, 0)}>
              Contact us
            </Link>
            <Link to={user ? `/profile/${user.id}` : "/login"} onClick={() => window.scrollTo(0, 0)}>
              {user ? "Profile" : "Login"}
            </Link>
            <Link to="/items" onClick={() => window.scrollTo(0, 0)}>
              Items
            </Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize={"lg"} mb={2}>
              Support
            </Text>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <Text fontWeight="bold" fontSize={"lg"} mb={2}>
              Subscribe to our Newsletter
            </Text>
            <form ref={form} onSubmit={sendEmail}>
              <Stack direction={"row"}>
                <Input
                  name={"user_email"}
                  type={"email"}
                  id="email"
                  placeholder={"Your email address"}
                  bg="gray.200"
                  border={0}
                  fontSize={"sm"}
                  _focus={{
                    bg: "gray.300",
                  }}
                  isRequired
                />
                <IconButton
                  as="button"
                  type="submit"
                  colorScheme="blue"
                  _hover={{
                    bg: "blue.700",
                  }}
                  aria-label="Subscribe"
                  icon={<BiMailSend />}
                />
              </Stack>
            </form>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
