export const style = {
  body: {
    height: "100dvh",
    bgcolor: "#F1F3F4",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    maxWidth: "500px",
    bgcolor: "white",
    borderRadius: 2,
    overflow: "hidden",
  },
  logo: {
    textAlign: "center",
    bgcolor: "#1BD741",
    color: "#FFFFFF",
    py: "2rem",
    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
    },
    "& p": {
      fontSize: "1.4rem",
      fontWeight: 600,
    },
  },
  subTxt: {
    textAlign: "center",
    fontSize: "1.1rem",
    fontWeight: 500,
  },
  fieldsWrapper: {
    px: "2rem",
    pt: "2.8rem",
    pb: "1.5rem",
  },
  emailField: {
    "& .MuiInput-input::placeholder": {
      opacity: 0.7,
      fontSize: "0.8rem",
    },
    "& .MuiInputBase-root .MuiInputBase-input": {
      borderBottom: "2px solid white",
    },
    "& .Mui-error .MuiInputBase-input": {
      borderBottom: "initial",
    },
    "& .MuiInputBase-root.Mui-focused:after": {
      borderBottom: "2px solid #1BD741",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#1BD741",
      fontWeight: 700,
    },
  },
  passwordField: {
    "& .MuiInput-input::placeholder": {
      opacity: 0.7,
      fontSize: "0.8rem",
    },
    "& .MuiInputBase-root .MuiInputBase-input": {
      borderBottom: "2px solid white",
    },
    "& .Mui-error .MuiInputBase-input": {
      borderBottom: "initial",
    },
    "& .MuiInputBase-root.Mui-focused:after": {
      borderBottom: "2px solid #1BD741",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#1BD741",
      fontWeight: 700,
    },
  },
  thirdPartySignUp: {
    "& .MuiButtonBase-root": {
      border: "1px solid rgba(0,0,0,0.3)",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "1.3rem",
    },
  },
  signUpBtn: {
    bgcolor: "#1BD741",
    textTransform: "capitalize",
    py: "0.5rem",
    "&:hover": {
      bgcolor: "#1BD741",
    },
  },
  instaIcon: {
    color: "#D80C5C",
  },
  facebookIcon: {
    color: "#4181ed",
  },
};
