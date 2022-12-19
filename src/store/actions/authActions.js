import axios from "axios";

import {
  authRequest,
  authFail,
  signupSuccess,
  loginSuccess,
  logoutSuccess,
  setPreviewImage,
} from "../features/authSlicer";

import base64 from "base-64";

let image = null;
export const validateImage = (payload, dispatch, toast) => {
  const file = payload.target.files[0];
  if (file.size >= 1048576) {
    return toast({
      title: "Max file size is 1MB",
      description: "please try again",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  } else {
    console.log("image added successfully", file);
    dispatch(setPreviewImage(URL.createObjectURL(file)));
    return (image = file);
  }
};

export const uploadUserImage = async () => {
  if (!image) return null;
  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "emazad_app");
  return axios.post("https://api.cloudinary.com/v1_1/skokash/image/upload", data).then((res) => {
    console.log("image uploaded successfully", res.data.url);
    return res.data.url;
  });
};

export const signUp = (dispatch, payload, imageURL, toast) => {
  payload.preventDefault();

  if (payload.target.password.value === payload.target.confirmPassword.value) {
    dispatch(authRequest());

    const data = {
      userName: payload.target.userName.value,
      password: payload.target.password.value,
      fullName: payload.target.fullName.value,
      email: payload.target.email.value,
      phoneNumber: payload.target.phoneNumber.value,
      gender: payload.target.gender.value,
      birthDate: payload.target.birthDate.value,
      image: imageURL || null,
    };

    try {
      if (payload.error) {
        dispatch(authFail(payload.error));
      } else {
        dispatch(authRequest());
        axios
          .post(`${process.env.REACT_APP_HEROKU_API_KEY}/signup`, data)
          .then((res) => {
            dispatch(signupSuccess(res.data));

            toast({
              title: "Account created.",
              description: "We've sent a verification email to your email address. Please verify your account.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
          })
          .catch((err) => {
            dispatch(authFail(err.response.data));
            toast({
              title: "Something went wrong.",
              description: `${err.response.data}` || "Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }
    } catch (error) {
      dispatch(authFail(error.response.data));
      toast({
              title: "Something went wrong.",
              description: `${error.response.data}` || "Please try again.",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
    }
  } else {
    dispatch(authFail("The password entered does not match! Please try again."));
    toast({
      title: "Something went wrong.",
      description: "The password entered does not match! Please try again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};

export const login = (dispatch, payload, toast) => {
  payload.preventDefault();

  const user = {
    email: payload.target.email.value,
    password: payload.target.password.value,
  };

  const encodedUser = base64.encode(`${user.email}:${user.password}`);

  try {
    if (payload.error) {
      dispatch(authFail(payload.error));
    } else {
      dispatch(authRequest());
      axios
        .post(
          `${process.env.REACT_APP_HEROKU_API_KEY}/login`,
          {},
          {
            headers: {
              Authorization: `Basic ${encodedUser}`,
            },
          }
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("username", res.data.userName);
          localStorage.setItem("userID", res.data.id);

          toast({
            title: `Welcome back ${res.data.userName} !`,
            description: "You are now logged in.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          dispatch(authFail(err.response.data));
          console.log(err.response.data)
          toast({
            title: "Something went wrong.",
            description: `${err.response.data}` || "Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  } catch (error) {
    dispatch(authFail(error));
    toast({
            title: "Something went wrong.",
            description: `${error.response.data}` || "Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
  }
};

export const logout = (dispatch) => {
  try {
    dispatch(logoutSuccess());
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
  } catch (error) {
    dispatch(authFail(error));
  }
};

export const verifyEmail = (dispatch, payload, toast) => {
  payload.preventDefault();

  const user = {
    email: payload.target.email.value,
    password: payload.target.password.value,
  };

  const encodedUser = base64.encode(`${user.email}:${user.password}`);

  try {
    if (payload.error) {
      dispatch(authFail(payload.error));
    } else {
      dispatch(authRequest());

      const url = window.location.href;
      const urlArray = url.split("/");
      const id = urlArray[urlArray.length - 1];

      axios
        .post(
          `${process.env.REACT_APP_HEROKU_API_KEY}/verification/${id}`,
          {},
          {
            headers: {
              Authorization: `Basic ${encodedUser}`,
            },
          }
        )
        .then((res) => {
          dispatch(loginSuccess(res.data));
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.setItem("username", res.data.userName);
          localStorage.setItem("userID", res.data.id);
          toast({
            title: "Verification successful.",
            description: `Welcome to eMazad ${res.data.userName}, you are now logged in.`,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        })
        .catch((err) => {
          dispatch(authFail(err.response.data));
          toast({
            title: "Something went wrong.",
            description: `${err.response.data}` || "Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  } catch (error) {
    dispatch(authFail(error));
    toast({
      title: "Something went wrong.",
      description: `${error.response.data}` || "Please try again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }
};
