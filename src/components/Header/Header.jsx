import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../Redux/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase/Firebase";
import { useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { NETFLIX_LOGO, NETFLIX_PROFILE_PIC } from "../../Constants";
import { toggleGptSearch } from "../Redux/GptSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user.uid;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe(); //This is provied us to from firebase to unsubscribe from the auth state listener
    // when the component unmounts
  }, []);

  const handelSingout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      alert("Sign out Failed! " + error.message);
      console.error("Sign out Error:", error);
    }
  };

  const handelGptSearch = () => {
    dispatch(toggleGptSearch())
  }

  return (
    <div className="flex justify-between items-center w-full px-6 py-4 absolute top-0 z-20 bg-gradient-to-b from-black to-transparent">
      <img className="w-45" src={NETFLIX_LOGO} alt="" />
      {user && (
        <div>
          <div className="flex">
           <button
              className=" text-white border-1-white px-2 py-1 cursor-pointer  hover:border-2 border-red-600 active:bg-red-700 rounded-lg mr-4"
              onClick={() => handelGptSearch()}
            >
              { showGptSearch ?  "Home Page" :"GPT Search"  }
            </button>
            <button
              className="  text-white border-1-white px-2 py-1 cursor-pointer hover:border-2 border-red-600 active:bg-red-700 rounded-lg mr-4"
              onClick={() => handelSingout()}
            >
              Sign Out
            </button>
            <img className=" w-7 h-7 " src={NETFLIX_PROFILE_PIC} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
