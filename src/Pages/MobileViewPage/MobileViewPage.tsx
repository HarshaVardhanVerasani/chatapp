import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, Box, ButtonBase, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileTab from '../../Components/ProfileTab/ProfileTab';
import AppContext from '../../Context/AppContext';
import { style } from './MobileViewPageStyle';

const MobileViewPage = () => {
    const navigate = useNavigate()
    const { allUsers, handleChattingWithUser, currentUser } = useContext(AppContext)
    
    const handleSingleUserChat = (id: string, name: string) => {
        handleChattingWithUser(id)
        navigate(`/chat/${name}`)
    }

    return (
        <Box sx={style.container}>
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
                        <TextField sx={style.searchField} id="standard-basic" placeholder='Search or Start New Chat' variant="standard" InputProps={{
                            startAdornment: (<IconButton>
                                <SearchIcon />
                            </IconButton>)
                        }} />
                    </Stack>
                    {allUsers.filter(u => u.uid !== currentUser.uid).map((user) => (<ButtonBase key={user.uid} sx={{ width: "100%" }} onClick={() => handleSingleUserChat(user.uid, user.name)}>
                        <Stack sx={style.profileList}>
                            <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                <Avatar src={user.photoUrl} alt={user.name}></Avatar>
                                <Box>
                                    <Typography>{user.name}</Typography>
                                </Box>
                            </Stack>
                        </Stack>
                    </ButtonBase>
                    ))}
                </Box>
            </Stack>
        </Box>
    )
}

export default MobileViewPage;