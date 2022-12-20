import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { selectUser } from "../../store/features/authSlicer";
import { FiHome } from "react-icons/fi";

export default function UserMenu({ setCurrentTab }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  return (
    <Menu>
      <MenuButton _hover={{ color: "blue.500" }}>
        <IoPersonCircleOutline size="32px" />
      </MenuButton>
      <MenuList borderRadius="2xl" boxShadow="md">
        <Link to={`/profile/${user.id}`} onClick={() => setCurrentTab("profile")}>
          <MenuItem icon={<IoPersonCircleOutline size="20px" />}>Profile</MenuItem>
        </Link>
        { user.role === "admin" && 
        <Link to="/admin">
          <MenuItem icon={<FiHome size="20px" />}>Dashboard</MenuItem>
        </Link>
        }
        <Link to="/" onClick={() => logout(dispatch)}>
          <MenuItem icon={<IoLogOutOutline size="20px" />}>Logout</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}
