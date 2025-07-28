import React, { useEffect } from "react";
import Login from "./Login/Login";
import Browse from "./Browse/Browse";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./Firebase/Firebase"
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./Redux/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "browse",
      element: <Browse />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      
        const {uid, email, displayName} = user.uid;
        dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        // navigate("/browse")
      } else {
       dispatch(removeUser());
      }
    });
  }, []);
  return <RouterProvider router={appRoute} />;
};

export default Body;
