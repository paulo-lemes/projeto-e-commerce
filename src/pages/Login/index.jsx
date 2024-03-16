import { useRef } from "react";
import fetchApi from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useAlert } from "../../context/AlertContext";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css"

const Login = () => {
  const formData = useRef(null);
  const navigate = useNavigate();
  const { handleLogin } = useAuth();
  const { showAlert } = useAlert()

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
      showAlert("Logged in successfully!")
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
    <div className={style.divLogin}>
      <h2 className={style.loginTitle}>LOGIN</h2>
      <form ref={formData} onSubmit={handleForm} className={style.form}>
        <label htmlFor="username">Username:</label>
        <input type="text" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" />
        <button type="submit" className={style.btnLogin}>Sign in</button>
      </form>
    </div>
  );
};

export default Login;
