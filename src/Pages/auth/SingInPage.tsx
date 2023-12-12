import { Visibility, VisibilityOff } from '@mui/icons-material';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Box, Button, Divider, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GOOGLE_ICON from '../../Assets/Images/googleIcon.png';
import { auth, db, doc, facebookProvider, googleProvider, setDoc } from './Config';
import { style } from './SignInPageStyle';

interface IState {
  email: string,
  password: string
}

function SingInPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState<IState>({ email: "", password: "" })

  const googleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, googleProvider)
      const token = await user.getIdToken()
      if (token) {
        await setDoc(doc(db, "users", user.uid), { uid: user.uid, name: user.displayName, photoUrl: user.photoURL })
        localStorage.setItem("token", user.uid);
        navigate("/")
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const facebookLogin = async () => {
    try {
      const res = await signInWithPopup(auth, facebookProvider)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  const handleThirdPartyLogin = (medium: string) => {
    switch (medium) {
      case 'facebook':
        facebookLogin()
        break
      case 'google':
        googleLogin()
        break
    }
  }

  const handleFormLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if(formData.email && formData.password){
      try {
        const { user } = await signInWithEmailAndPassword(auth, formData.email, formData.password)
        const token = user.uid
        if (token) {
          localStorage.setItem("token", token);
          navigate("/")
          window.location.reload()
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <Box sx={style.body}>
      <Box sx={style.wrapper}>
        <Box sx={style.logo}>
          <WhatsAppIcon />
          <Typography>WhatsApp</Typography>
        </Box>
        <Box sx={style.fieldsWrapper}>
          <Typography sx={style.subTxt}>Login</Typography>
          <Box component={"form"}>
            <Stack direction={"column"} spacing={3} mb={10}>
              <TextField sx={style.emailField} id="email" label="Email" variant="standard" type='email' onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              <TextField sx={style.passwordField} id="password" label="Password" variant="standard" type={showPassword ? "text" : "password"} InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <Button type='submit' variant='contained' sx={style.signUpBtn} onClick={(e) => handleFormLogin(e)}>sign up</Button>
              <Typography sx={{ textAlign: "end" }}>Don't have an account <Link to="/sign-up"> <Typography variant='subtitle2' component={"span"}>Click here</Typography></Link></Typography>
            </Stack>
          </Box>
          <Divider sx={{ mb: "2rem", fontFamily: "Poppins" }}>or sign in with</Divider>
          <Stack sx={style.thirdPartySignUp} direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={2}>
            <IconButton onClick={() => handleThirdPartyLogin('facebook')}>
              <FacebookRoundedIcon sx={style.facebookIcon} />
            </IconButton>
            <IconButton>
              <InstagramIcon sx={style.instaIcon} />
            </IconButton>
            <IconButton onClick={() => handleThirdPartyLogin('google')} >
              <Box component={"img"} src={GOOGLE_ICON} alt='google icon' width={21}></Box>
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default SingInPage;

