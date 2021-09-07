import { useEffect, useState } from "react";
import { HashRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import { firebase } from "../firebase/firebase-config";

import AuthRouter from "./AuthRouter";
import PrivateRouter from "./PrivateRoute";
import PublicRouter from "./PublicRoute";

import { Listar } from "../actions/movieAction";
import { login } from "../actions/auth";

import Profile from "../pages/Profile";
import AddMovie from "../pages/AddMovie";
import Home from "../pages/Home";

import Loading from "../components/Loading";
import TopMovies from "../pages/TopMovies";
import LessPopularMovies from "../pages/LessPopularMovies";


const AppRouter = () => {
  //HOOK useState
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //HOOK useDispatch react-redux
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // console.log(user);
      if (user) {
        dispatch(login(user.uid, user.displayName, user.photoURL));
        setIsLoggedIn(true);
        dispatch(Listar());
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking]);

  if (checking) {
    return <Loading />;
  }

  return (
    <Router>
      <Switch>
        <PublicRouter
          path="/auth"
          component={AuthRouter}
          isAuthenticated={isLoggedIn}
        />

        <PrivateRouter
          exact
          path="/"
          component={Home}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/TopMovies"
          component={TopMovies}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/LowestMovies"
          component={LessPopularMovies}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/profile"
          component={Profile}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/add"
          component={AddMovie}
          isAuthenticated={isLoggedIn}
        />
        <PrivateRouter
          exact
          path="/edit"
          component={AddMovie}
          isAuthenticated={isLoggedIn}
        />

        <Redirect to="/auth/login" />
      </Switch>
    </Router>
  );
};

export default AppRouter;
