import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./style.module.css"

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={style.divProfile}>
      <h2 className={style.profileTitle}>PROFILE</h2>
      {user && (
        <>
          <p>First name: {user.name.firstname}</p>
          <p>Last name: {user.name.lastname}</p>
          <p>Username: {user.username}</p>
          <p>E-mail: {user.email}</p>
          <p>Phone number: {user.phone}</p>
          <p>Adress</p>
          <p>Street: {user.address.street}</p>
          <p>Number: {user.address.number}</p>
          <p>Zipcode: {user.address.zipcode}</p>
          <p>City: {user.address.city}</p>
        </>
      )}
      <Link to="/" className={style.linkBtnHome}>
        <button type="button" className={style.btnHome}>Home page</button>
      </Link>
    </div>
  );
};

export default Profile;
