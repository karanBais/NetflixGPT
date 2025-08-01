import {useEffect} from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../Redux/userSlice';
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/Firebase' 
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { NETFLIX_LOGO, NETFLIX_PROFILE_PIC } from '../../Constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)

    useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
      
        const {uid, email, displayName} = user.uid;
        dispatch(addUser({uid: uid, email: email, displayName: displayName}));
        navigate("/browse")
      } else {
       dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe(); //This is provied us to from firebase to unsubscribe from the auth state listener 
    // when the component unmounts
  }, []);
  
  const handelSingout = async() =>{
    try{
      await signOut(auth);
    }
    catch(error){
      alert("Sign out Failed! " + error.message);
      console.error("Sign out Error:", error);
    }
  }

  return (
    <div className="flex justify-between items-center w-full px-6 py-4 absolute top-0 z-20 bg-gradient-to-b from-black to-transparent">
        <img className='w-45' src={NETFLIX_LOGO} alt="" />
   {user && <div>
      <img className='w-7' src={NETFLIX_PROFILE_PIC} alt="" />
      <button className='font-bold text-white cursor-pointer hover:text-red-500 mr-4' onClick={() => handelSingout()}>Sign out</button>
    </div>}
    </div>
  )
}

export default Header