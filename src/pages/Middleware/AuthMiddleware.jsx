import Login from "../Login";

function AuthMiddleware({ children }) {
  return [null, undefined].includes(window.sessionStorage.getItem("jwt")) ? (
    <Login />
  ) : (
    children
  );
}

export default AuthMiddleware;
