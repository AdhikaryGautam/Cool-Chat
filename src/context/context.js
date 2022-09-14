import { createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import Loading from "../pages/Loading";
import { doc, getDoc } from "firebase/firestore";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [user2, setUser2] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatLoading, setIsChatLoading] = useState(true);
  const [isChatDetailsLoading, setIsChatDetailsLoading] = useState(true);
  const [message, setMessage] = useState();
  const [showChatDetails, setShowChatDetails] = useState(false);

  const selectUser = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUser2(docSnap.data());
    setShowChatDetails(true);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        user2,
        setUser2,
        selectUser,
        isChatLoading,
        setIsChatLoading,
        isChatDetailsLoading,
        setIsChatDetailsLoading,
        chatUsers,
        setChatUsers,
        message,
        setMessage,
        showChatDetails,
        setShowChatDetails,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
