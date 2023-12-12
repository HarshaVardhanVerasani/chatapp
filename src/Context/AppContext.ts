import { createContext } from "react";
import { Chat, User } from "./../Typescript/GlobalTypes";

interface Context {
  currentUser: User;
  allUsers: User[];
  currentChattingUser: User;
  handleChattingWithUser: (uid: string) => void;
  chatsBetweenTwoUsers: Chat[];
  handleChatBetweenTwoUsers: () => void;
  clearAllStates: () => void;
  handleSearchUsers: (name: string) => void;
}

const AppContext = createContext<Context>({
  currentUser: { uid: "", name: "", photoUrl: "" },
  allUsers: [{ uid: "", name: "", photoUrl: "" }],
  currentChattingUser: { uid: "", name: "", photoUrl: "" },
  handleChattingWithUser: (uid: string) => {},
  chatsBetweenTwoUsers: [{ userUid: "", time: "", text: "" }],
  handleChatBetweenTwoUsers: () => {},
  clearAllStates: () => {},
  handleSearchUsers: (name: string) => {},
});

export default AppContext;
