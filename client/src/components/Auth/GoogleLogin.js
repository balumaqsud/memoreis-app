import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// Your Google Client ID

const GoogleSignInButton = (classes) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    const credentials = jwtDecode(res.credential);

    try {
      dispatch({ type: "AUTH", data: credentials });
      navigate("/");
      window.location.reload();
    } catch (error) {}
  };
  const googleFailure = () => {
    console.log("you have issue with signing");
  };

  return (
    <GoogleLogin
      locale="en_US"
      width="364"
      onSuccess={googleSuccess}
      onError={googleFailure}
    />
  );
};

export default GoogleSignInButton;
