import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  console.log(user);

  return (
    <>
      <h2>Profile</h2>
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
      <Link to="/">
        <button type="button" >Home page</button>
      </Link>
    </>
  );
};

export default Profile;
