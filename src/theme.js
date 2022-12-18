import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },

  colors: {
    grey: {
      100: "#ededed",
      200: "#D7D7D9",
      300: "#b0aeae",
    },
    darkBlue: {
      100: "#1f5469",
      200: "#133340",
      300: "#0d252e",
    },
    mediumBlue: {
      100: "#1e96b0",
      200: "#18778C",
      300: "#125f70",
    },
    lightBlue: {
      100: "#69ebfa",
      200: "#5BCCD9",
      300: "#51b8c4",
    },
    brown: {
      100: "#d98c71",
      200: "#A66B56",
      300: "#915d4a",
    },
    white: {
      100: "#FFFFFF",
    },
    black: {
      100: "#000000",
    },
    success: {
      100: "#CDEBB7",
      200: "#94D466",
      300: "#61A72F",
    },
    error: {
      100: "#FFE3E1",
      200: "#FE877C",
      300: "#FD2A17",
    },
  },

  textStyles: {
    h1: {
      fontSize: ["2xl", "3xl", "4xl"],
      fontWeight: "bold",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
    h2: {
      fontSize: ["lg", "xl", "2xl"],
      fontWeight: "semibold",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
    h3: {
      fontSize: ["sm", "md", "lg"],
      fontWeight: "semibold",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
    h4: {
      fontSize: ["xs", "sm", "md"],
      fontWeight: "semibold",
      lineHeight: "shorter",
      letterSpacing: "tight",
    },
  },

  fonts: {
    heading: "Poppins",
    body: "Poppins",
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "light" ? "white.100" : "black.300",
        color: props.colorMode === "light" ? "black.300" : "white.100",
      },
    }),
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: "regular",
        borderRadius: "md",
      },
      variants: {
        primary: {
          bg: "mediumBlue.200",
          color: "white.100",
          _hover: {
            bg: "mediumBlue.300",
          },
        },
        secondary: {
          bg: "lightBlue.300",
          color: "white.100",
          _hover: {
            bg: "lightBlue.200",
          },
        },
        tertiary: {
          bg: "darkBlue.200",
          color: "white.100",
          _hover: {
            bg: "darkBlue.300",
          },
        },

        light: {
          bg: "grey.100",
          color: "darkBlue.200",
          _hover: {
            bg: "darkBlue.200",
            color: "grey.200",
          }

        },

        success: {
          bg: "success.300",
          color: "white.100",
          _hover: {
            bg: "success.200",
          },
        },
        error: {
          bg: "error.300",
          color: "white.100",
          _hover: {
            bg: "error.200",
          },
        },
      },
    },

    Input: {
      baseStyle: {
        borderRadius: "md",
      },
      variants: {
        auth: {
          field: {
            bg: "grey.100",
            color: "black.100",
            _hover: {
              bg: "grey.200",
              borderColor: "mediumBlue.200",
            },
            _focus: {
              bg: "grey.200",
              borderColor: "lightBlue.100",
              color: "black.100",
              shadow: "none",
            },
          },
        },
      },
    },

    Select: {
      baseStyle: {
        borderRadius: "md",
      },
      variants: {
        auth: {
          field: {
            bg: "grey.100",
            color: "black.100",
            _hover: {
              bg: "grey.200",
              borderColor: "mediumBlue.200",
            },
            _focus: {
              bg: "grey.200",
              borderColor: "lightBlue.100",
              color: "black.100",
              shadow: "none",
            },
          },
        },
      },
    },

    shadows: {
      blueShadow: {
        100: "0 0 0 3px #1e96b0",
      },
    },

    // Textarea: {
    //   variants: {
    //     post: (props) => ({
    //       bg: props.colorMode === "light" ? "gray.200" : "gray.800",
    //       border: "1px",
    //       borderColor: "gray.500",
    //       borderRadius: "3xl",
    //       _hover: { borderColor: props.colorMode === "light" ? "gray.700" : "gray.300" },
    //       _focus: { borderColor: "#3182ce", boxShadow: "0 0 0 1px #3182ce" },
    //       width: {
    //         base: "90vw",
    //         md: "75vw",
    //         lg: "60vw",
    //         xl: "50vw",
    //       },
    //     }),
    //   },
    // },

    // Checkbox: {},
    // breakpoints: {
    //     base: "0em",
    //     sm: "20em",
    //     md: "48em",
    //     lg: "62em",
    //     xl: "80em",
    //   },
    // defaultProps: {
    //     variant: "primary",
    // },
  },
});

export default theme;
