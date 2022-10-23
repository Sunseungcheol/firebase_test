import { HomeOutlined } from "@ant-design/icons";
import { Avatar, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { authService } from "../firebase";

const Navigation = ({ userObj }) => {
  const navigate = useNavigate();
  const onLogoutClick = () => {
    authService.signOut();
    navigate("/");
  };

  const NavStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    padding: 10px 10px 0;

    button {
      margin-left: 10px;
    }
  `;
  return (
    <>
      <NavStyled>
        <div>
          <Link to="/">
            <HomeOutlined style={{ color: "#08c" }} />
          </Link>
        </div>

        <div>
          {userObj.photoUrl}
          <Link to="/Profile">
            <Avatar src={userObj.photoURL} />{" "}
            {userObj ? `${userObj.displayName}` : ""}
          </Link>
          <Button size="small" onClick={onLogoutClick}>
            logout
          </Button>
        </div>
      </NavStyled>
    </>
  );
};

export default Navigation;
