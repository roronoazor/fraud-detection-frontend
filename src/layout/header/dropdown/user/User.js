import React, { useState } from "react";
import { DropdownToggle, DropdownMenu, Dropdown } from "reactstrap";
import { Icon } from "../../../../components/Component";
import { LinkList, LinkItem } from "../../../../components/links/Links";
import UserAvatar from "../../../../components/user/UserAvatar";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../modules/auth/redux/authSlice";
import { getAuthUser } from "../../../../modules/auth/redux/authSelector";

const User = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prevState) => !prevState);
  const dispatch = useDispatch();
  const userData = useSelector(getAuthUser);
  const userInfo = userData?.info || {};
  const normalizeValue = (value) => {
    if (!value || value === "null" || value === "undefined") {
      return "";
    }
    return value;
  };
  const firstName = normalizeValue(userInfo.firstName);
  const lastName = normalizeValue(userInfo.lastName);
  const email = normalizeValue(userInfo.email || userData?.email);
  const displayName = [firstName, lastName].filter(Boolean).join(" ") || email || "User";
  const initialsSource = firstName || lastName ? `${firstName} ${lastName}` : displayName;
  const initials = initialsSource
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((namePart) => namePart.charAt(0).toUpperCase())
    .join("");

  const handleSignout = () => {
    dispatch(logout());
  };

  return (
    <Dropdown isOpen={open} className="user-dropdown" toggle={toggle}>
      <DropdownToggle
        tag="a"
        href="#toggle"
        className="dropdown-toggle"
        onClick={(ev) => {
          ev.preventDefault();
        }}
      >
        <UserAvatar icon="user-alt" className="sm" />
      </DropdownToggle>
      <DropdownMenu right className="dropdown-menu-md dropdown-menu-s1">
        <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
          <div className="user-card sm">
            <div className="user-avatar">
              <span>{initials || "U"}</span>
            </div>
            <div className="user-info">
              <span className="lead-text">{displayName}</span>
              {email && <span className="sub-text">{email}</span>}
            </div>
          </div>
        </div>
        {/* <div className="dropdown-inner">
          <LinkList>
            <LinkItem link="/user-profile-regular" icon="user-alt" onClick={toggle}>
              View Profile
            </LinkItem>
            <LinkItem link="/user-profile-setting" icon="setting-alt" onClick={toggle}>
              Account Setting
            </LinkItem>
            <LinkItem link="/user-profile-activity" icon="activity-alt" onClick={toggle}>
              Login Activity
            </LinkItem>
          </LinkList>
        </div> */}
        <div className="dropdown-inner">
          <LinkList>
            <a href={`${process.env.PUBLIC_URL}/auth-login`} onClick={handleSignout}>
              <Icon name="signout"></Icon>
              <span>Sign Out</span>
            </a>
          </LinkList>
        </div>
      </DropdownMenu>
    </Dropdown>
  );
};

export default User;
