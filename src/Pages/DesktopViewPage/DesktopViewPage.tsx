import AttachFileIcon from "@mui/icons-material/AttachFile";
import ChatIcon from "@mui/icons-material/Chat";
import MicIcon from "@mui/icons-material/Mic";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import {
  Avatar,
  Box,
  ButtonBase,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { arrayUnion, onSnapshot, updateDoc } from "firebase/firestore";
import moment from 'moment';
import { useContext, useEffect, useState } from "react";
import ProfileTab from "../../Components/ProfileTab/ProfileTab";
import AppContext from "../../Context/AppContext";
import { db, doc, getDoc, setDoc } from "../auth/Config";
import { style } from "./DesktopViewPageStyle";


const DesktopViewPage = () => {
  const [inputData, setInputData] = useState<string>("");
  const [searchTxt, setSearchTxt] = useState<string>("");

  const {
    currentUser,
    allUsers,
    handleChattingWithUser,
    currentChattingUser,
    chatsBetweenTwoUsers,
    handleChatBetweenTwoUsers,
    handleSearchUsers
  } = useContext(AppContext);

  const handleSendingMessage = async () => {
    const combinedUids =
      currentUser.uid > currentChattingUser.uid
        ? currentChattingUser.uid + currentUser.uid
        : currentUser.uid + currentChattingUser.uid;

    try {
      const res = await getDoc(doc(db, "messages", combinedUids));
      if (!res.exists()) {
        await setDoc(doc(db, "messages", combinedUids), {
          allMsg: [
            {
              userUid: currentUser.uid,
              text: inputData,
              time: moment().format("LT")
            },
          ],
        });
      } else {
        await updateDoc(doc(db, "messages", combinedUids), {
          allMsg: arrayUnion({
            userUid: currentUser.uid,
            text: inputData,
            time: moment().format("LT")
          }),
        });
      }

      onSnapshot(doc(db, "messages", combinedUids), (doc) => {
        console.log("Current data: ", doc.data());
        handleChatBetweenTwoUsers()
      });
      setInputData("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearchUsers(searchTxt)
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTxt])

  return (
    <Box sx={style.container}>
      <Box sx={style.bgBack}></Box>
      <Stack sx={style.wrapper}>
        <Box sx={style.innerWrapperLeft}>
          <Stack sx={style.profileTabLeft} >
            <ProfileTab />
            <Stack direction={"row"} spacing={2}>
              <ChatIcon />
              <MoreVertIcon />
            </Stack>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"}>
            <TextField
              sx={style.searchField}
              id="standard-basic"
              placeholder="Search or Start New Chat"
              variant="standard"
              InputProps={{
                startAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
              value={searchTxt}
              onChange={(e) => setSearchTxt(e.target.value)}
            />
          </Stack>
          <Box sx={{ height: "87.5%", overflow: "auto" }}>
            {allUsers.length <= 0 ? <CircularProgress color="info" sx={{ mx: "auto", display: "block", mt: "2rem" }} /> :
              allUsers.filter((user) => user.uid !== currentUser.uid)
                .map((user) => (
                  <ButtonBase
                    sx={{ display: "block", width: "100%" }}
                    key={user.uid}
                    onClick={() => handleChattingWithUser(user.uid)}
                  >
                    <Stack sx={style.profileList}>
                      <Stack direction={"row"} alignItems={"center"} spacing={2}>
                        <Avatar src={user.photoUrl} alt={user.name}></Avatar>
                        <Box>
                          <Typography sx={style.name}>{user.name}</Typography>
                          <Typography sx={style.status}></Typography>
                        </Box>
                      </Stack>
                      <Typography sx={style.time}>{""}</Typography>
                    </Stack>
                  </ButtonBase>
                ))}
          </Box>
        </Box>
        <Box sx={style.innerWrapperRight}>
          <Stack sx={style.profileTabRight}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Avatar
                src={currentChattingUser.photoUrl}
                alt={currentChattingUser.name}
              ></Avatar>
              <Typography>{currentChattingUser.name}</Typography>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              <IconButton>
                <AttachFileIcon sx={{ rotate: "30deg", scaleY: "1" }} />
              </IconButton>
              <IconButton>
                <MoreVertIcon />
              </IconButton>
            </Stack>
          </Stack>
          <Box sx={style.chatSpace}>
            {chatsBetweenTwoUsers.length <= 0 ? <CircularProgress color="success" sx={{ mx: "auto", display: "block", mt: "2rem" }} /> :
              chatsBetweenTwoUsers.map((chat, index) => {
                if (chat.userUid === currentUser.uid) {
                  return (
                    <Typography
                      sx={{
                        ...style.senderMsg,
                        width: `${chat.text.length > 50 ? "50%" : "fit-content"}`,
                      }}
                      key={index}
                    >
                      {chat.text} <Typography sx={{ fontSize: "0.7rem" }} component={"small"}>{chat.time}</Typography>
                    </Typography>
                  );
                }
                return (
                  <Typography
                    sx={{
                      ...style.receiverMsg,
                      width: `${chat.text.length > 50 ? "50%" : "fit-content"}`,
                    }}
                    key={index}
                  >
                    {chat.text}  <Typography sx={{ fontSize: "0.7rem" }} component={"small"}>{chat.time}</Typography>
                  </Typography>
                );
              })}
          </Box>
          <Stack sx={style.chatActions}>
            <IconButton>
              <SentimentSatisfiedAltIcon />
            </IconButton>
            <TextField
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              sx={style.chatInput}
              id="standard-basic"
              variant="standard"
            />
            <IconButton onClick={handleSendingMessage}>
              <SendIcon />
            </IconButton>
            <IconButton>
              <MicIcon />
            </IconButton>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default DesktopViewPage;
