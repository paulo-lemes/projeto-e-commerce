import { useRef } from "react";
import fetchApi from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const formData = useRef(null);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const postLogin = async (usr, pw) => {
    try {
      const { data } = await fetchApi("/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: usr,
          password: pw,
        }),
      });

      handleLogin(data.token);
      navigate("/");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleForm = (event) => {
    event.preventDefault();

    const formInfos = new FormData(formData.current);
    const username = formInfos.get("username");
    const password = formInfos.get("password");

    postLogin(username, password);
  };

  return (
    <>
      <h2>Login</h2>
      <form ref={formData} onSubmit={handleForm}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
};

export default Login;
