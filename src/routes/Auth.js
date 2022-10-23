import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import styled from "styled-components";
import { authService } from "../firebase";

const Auth = () => {
  //const [form, setForm] = useState({ email: "", password: "" });
  // const onChange = ({ target: { name, value } }) => {
  //   setForm({ ...form, [name]: value });
  // };
  // const onSubmit = (event) => {
  //   event.preventDefault();
  // };

  const ButtonWrapStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    justify-content: center;

    .btnBox {
      position: relative;
      display: flex;
      justify-content: space-around;
      align-items: center;

      margin: 5px 0;
      border: 1px solid #ccc;
    }

    .appleLoginBtn {
      background-color: #333;
      color: #fff;
    }

    .socialIcon {
      position: absolute;
      top: 50%;
      left: 10px;
      transform: translateY(-50%);
    }

    button {
      padding: 10px 50px 10px 75px;
    }
  `;

  const onSocial = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;

    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "github") {
      provider = new GithubAuthProvider();
    }

    const data = await signInWithPopup(authService, provider);
  };
  return (
    <ButtonWrapStyled>
      <div className="btnBox googleLoginBtn">
        <button name="google" onClick={onSocial}>
          <GoogleOutlined className="socialIcon" />
          구글 로그인
        </button>
      </div>
      <div className="btnBox appleLoginBtn">
        <button name="github" onClick={onSocial}>
          <GithubOutlined className="socialIcon" />
          깃헙 로그인
        </button>
      </div>
    </ButtonWrapStyled>
  );
};

export default Auth;
