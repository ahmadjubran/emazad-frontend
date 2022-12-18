import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { selectUser } from "../../store/features/authSlicer";

export default function UserMenu({ setCurrentTab }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <Menu>
      <MenuButton _hover={{ color: "blue.500" }}>
        <IoPersonCircleOutline size="26px" />
      </MenuButton>
      <MenuList borderRadius="2xl" boxShadow="md">
        <Link to={`/profile/${user.id}`} onClick={() => setCurrentTab("profile")}>
          <MenuItem icon={<IoPersonCircleOutline size="20px" />}>Profile</MenuItem>
        </Link>
        <Link to="/" onClick={() => logout(dispatch)}>
          <MenuItem icon={<IoLogOutOutline size="20px" />}>Logout</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
