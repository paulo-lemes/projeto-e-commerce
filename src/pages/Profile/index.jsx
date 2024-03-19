import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import style from "./style.module.css";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className={style.divProfile}>
      <h2 className={style.profileTitle}>PROFILE</h2>
      <div className={style.divProfileInfo}>
        {user && (
          <>
            <p>
              <span className={style.infoTitle}>First name: </span>
              {user.name.firstname}
            </p>
            <p>
              <span className={style.infoTitle}>Last name: </span>
              {user.name.lastname}
            </p>
            <p>
              <span className={style.infoTitle}>Username: </span>
              {user.username}
            </p>
            <p>
              <span className={style.infoTitle}>E-mail: </span>
              {user.email}
            </p>
            <p>
              <span className={style.infoTitle}>Phone number: </span>
              {user.phone}
            </p>
            <p>
              <span className={style.infoTitle}>Adress </span>
            </p>
            <p>
              <span className={style.infoTitle}>Street: </span>
              {user.address.street}
            </p>
            <p>
              <span className={style.infoTitle}>Number: </span>
              {user.address.number}
            </p>
            <p>
              <span className={style.infoTitle}>Zipcode: </span>
              {user.address.zipcode}
            </p>
            <p>
              <span className={style.infoTitle}>City: </span>
              {user.address.city}
            </p>
          </>
        )}
      </div>
      <Link to="/" className={style.linkBtnHome}>
        <button type="button" className={style.btnHome}>
          Home page
        </button>
      </Link>
    </div>
  );
};

export default Profile;
