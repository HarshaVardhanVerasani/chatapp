import { onSnapshot } from "firebase/firestore";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, db, doc, getDoc, getDocs } from "../Pages/auth/Config";
import { Chat, User } from "../Typescript/GlobalTypes";
import AppContext from "./AppContext";

const AppState = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User>({
    uid: "",
    name: "",
    photoUrl: "",
  });
  const [allUsers, setAllUsers] = useState<User[]>([
    { uid: "", name: "", photoUrl: "" },
  ]);
  const [currentChattingUser, setCurrentChattingUser] = useState<User>({
    uid: "",
    name: "",
    photoUrl: "",
  });
  const [chatsBetweenTwoUsers, setChatsBetweenTwoUsers] = useState<Chat[]>([
    { userUid: "", text: "", time: "" },
  ]);
  const navigate = useNavigate();

  const handleChattingWithUser = (uid: string) => {
    const user = allUsers.filter((user) => user.uid === uid)[0];
    setCurrentChattingUser(user);
    setChatsBetweenTwoUsers([])
    handleChatBetweenTwoUsers();
  };

  const getCurrentUser = async () => {
    try {
      const currentUser = await getDoc(
        doc(db, "users", `${localStorage.getItem("token")}`)
      );
      const res = await getDocs(collection(db, "users"));
      const allUsers = res.docs.map((doc) => ({
        uid: doc.data().uid,
        name: doc.data().name,
        photoUrl: doc.data().photoUrl,
      }));
      const user = {
        uid: currentUser.data()?.uid,
        name: currentUser.data()?.name,
        photoUrl: currentUser.data()?.photoUrl,
      };
      setCurrentUser(user);
      setAllUsers(allUsers);
      const randomMiseChatUser = allUsers.filter((user) => user.uid !== currentUser.data()?.uid);
      setCurrentChattingUser(randomMiseChatUser[0]);
    } catch (error) {
      console.log(error)
    }
  };

  const handleChatBetweenTwoUsers = async () => {
    const combinedUids =
      currentUser.uid > currentChattingUser.uid
        ? currentChattingUser.uid + currentUser.uid
        : currentUser.uid + currentChattingUser.uid;
    try {
      const res = await getDoc(doc(db, "messages", combinedUids));
      if (res.exists()) {
        setChatsBetweenTwoUsers(res.data()?.allMsg);
      } else {
        setChatsBetweenTwoUsers([]);
      }
    } catch (error) {
      console.log(error)
    }
  };

  const handleSearchUsers = async (name: string) => {
    if (name.trim()) {
      try {
        const res = await getDocs(collection(db, "users"))
        const allUsers = res.docs.map((doc) => ({
          uid: doc.data().uid,
          name: doc.data().name,
          photoUrl: doc.data().photoUrl,
        }));
        const searchedUser = allUsers.filter((user: { name: string }) => user.name.toLowerCase().includes(name.toLowerCase()));
        console.log(searchedUser)
        setAllUsers(searchedUser)
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const res = await getDocs(collection(db, "users"))
        const allUsers = res.docs.map((doc) => ({
          uid: doc.data().uid,
          name: doc.data().name,
          photoUrl: doc.data().photoUrl,
        }));
        setAllUsers(allUsers)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const clearAllStates = () => {
    setCurrentUser({ uid: "", name: "", photoUrl: "" });
    setAllUsers([{ uid: "", name: "", photoUrl: "" }]);
    setChatsBetweenTwoUsers([]);
    setCurrentChattingUser({ uid: "", name: "", photoUrl: "" });
    navigate("/sign-in");
    localStorage.clear()
  };

  useEffect(() => {
    getCurrentUser();
    setAllUsers([]);
    setChatsBetweenTwoUsers([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser.name) {
      handleChatBetweenTwoUsers();
    }
    const combinedUids =
      currentUser.uid > currentChattingUser.uid
        ? currentChattingUser.uid + currentUser.uid
        : currentUser.uid + currentChattingUser.uid;
    console.log(combinedUids);
    if (combinedUids) {
      onSnapshot(doc(db, "messages", combinedUids), (doc) => {
        console.log("Current data: ", doc.data());
        handleChatBetweenTwoUsers()
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChattingUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers,
        currentChattingUser,
        handleChattingWithUser,
        handleChatBetweenTwoUsers,
        chatsBetweenTwoUsers,
        clearAllStates,
        handleSearchUsers
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
