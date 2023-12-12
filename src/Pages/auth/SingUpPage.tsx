import { Visibility, VisibilityOff } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  createUserWithEmailAndPassword,
  db,
  doc,
  setDoc,
} from "./Config";
import { style } from "./SignInPageStyle";

interface IState {
  email: string;
  password: string;
}

function SingUpPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<IState>({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const token = user.uid;
      await setDoc(doc(db, "users", token), {
        uid: token,
        name: user.email?.substring(0, user.email?.indexOf("@")),
        photoUrl: user.photoURL,
      });
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={style.body}>
      <Box sx={style.wrapper}>
        <Box sx={style.logo}>
          <WhatsAppIcon />
          <Typography>WhatsApp</Typography>
        </Box>
        <Box sx={style.fieldsWrapper}>
          <Typography sx={style.subTxt}>Create A New Account</Typography>
          <Box component={"form"}>
            <Stack direction={"column"} spacing={3} mb={10}>
              <TextField
                sx={style.emailField}
                id="email"
                label="Email"
                variant="standard"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <TextField
                sx={style.passwordField}
                id="password"
                label="Password"
                variant="standard"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <Button
                variant="contained"
                sx={style.signUpBtn}
                onClick={handleLogin}
              >
                sign up
              </Button>
              <Typography sx={{ textAlign: "end" }}>
                Already have an account{" "}
                <Link to="/sign-in">
                  {" "}
                  <Typography variant="subtitle2" component={"span"}>
                    Click here
                  </Typography>
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SingUpPage;
