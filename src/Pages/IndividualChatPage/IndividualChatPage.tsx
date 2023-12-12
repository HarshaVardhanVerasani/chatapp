/* eslint-disable react-hooks/exhaustive-deps */
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Avatar, Box, CircularProgress, IconButton, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import moment from 'moment';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../Context/AppContext';
import { db } from '../auth/Config';
import { style } from './IndividualChatPageStyle';

const IndividualChatPage = () => {
    const [inputData, setInputData] = useState<string>("");
    const theme = useTheme()
    const isMobileView = useMediaQuery(theme.breakpoints.down('md'))
    const { currentUser, currentChattingUser, chatsBetweenTwoUsers, handleChatBetweenTwoUsers } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isMobileView) {
            navigate("/")
        }
    }, [isMobileView])

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
            setInputData("");
            handleChatBetweenTwoUsers();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box sx={style.innerWrapperRight}>
            <Stack sx={style.profileTabRight}>
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <IconButton>
                        <Avatar src={currentChattingUser.photoUrl} alt={currentChattingUser.name}></Avatar>
                    </IconButton>
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
                            return (<Typography sx={{ ...style.senderMsg, width: `${chat.text.length > 50 ? "50%" : "fit-content"}` }} key={index}>{chat.text} <Typography sx={{ fontSize: "0.5rem" }} component={"small"}>{chat.time}</Typography></Typography>);
                        }
                        return (<Typography sx={{ ...style.receiverMsg, width: `${chat.text.length > 50 ? "50%" : "fit-content"}`, }} key={index}>{chat.text} <Typography sx={{ fontSize: "0.5rem" }} component={"small"}>{chat.time}</Typography></Typography>);
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
    )
}

export default IndividualChatPage;