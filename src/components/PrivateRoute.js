import { Route, Routes, Navigate } from "react-router-dom";
import { useLibrary } from "../context/AppContext";
const PrivateRoute = ({ component: Comp, hasAccess, path, ...rest }) => {
  const { loggedIn } = useLibrary();
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return loggedIn ? (
          <Comp {...props} />
        ) : (
          <Navigate
            to={{
              pathname: "/",
              state: {
                prevLocation: path,
                error: "You need to login first!",
              },
            }}
          />
        );
      }}
    />
  );
};
export default PrivateRoute;
