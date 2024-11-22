import useLogout from "../hooks/useLogout";

const LogoutButton = ({ closeNavHandler }) => {
  const { logoutHandler } = useLogout();
  return (
    <a onClick={() => logoutHandler(closeNavHandler)} className="logout_btn">
      Logout
    </a>
  );
};

export default LogoutButton;
