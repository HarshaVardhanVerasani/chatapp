import bg from "../../Assets/Images/bgchat.jpg";

export const style = {
  innerWrapperRight: {
    position: "relative",
    height: "100dvh",
  },
  profileTabRight: {
    bgcolor: "#EEEEEE",
    px: "0.5rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchField: {
    width: "95%",
    "& .MuiInput-input::placeholder": {
      opacity: 0.7,
      fontSize: "0.8rem",
      textAlign: "center",
    },
    "& .MuiInputBase-root.Mui-focused:after": {
      borderBottom: "2px solid #1BD741",
    },
    "& .MuiInputBase-root.MuiInput-root:before": {
      borderBottom: "none",
    },
  },
  chatSpace: {
    height: "87%",
    backgroundImage: `url(${bg})`,
    overflow: "auto",
    px: "0.5rem",
    py: "2rem",
  },
  chatActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "#EEEEEE",
    position: "absolute",
    bottom: 0,
    width: "100%",
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    px: "0.5rem",
    py: "0.7rem",
  },
  chatInput: {
    bgcolor: "#FFF",
    "&.MuiTextField-root": {
      width: "85%",
      borderRadius: 1,
      justifyContent: "end",
    },
    "& .MuiInputBase-root.MuiInput-root:before": {
      borderBottom: "none",
    },
    "& .MuiInputBase-root.Mui-focused:after": {
      borderBottom: "none",
    },
  },
  senderMsg: {
    color: "black",
    bgcolor: "#dcf8c6",
    width: "fit-content",
    px: "1rem",
    py: "0.5rem",
    borderRadius: 2,
    ml: "auto",
    my: "0.5rem",
    fontSize: "0.8rem",
  },
  receiverMsg: {
    color: "black",
    bgcolor: "#FFF",
    width: "fit-content",
    px: "1rem",
    py: "0.5rem",
    borderRadius: 2,
    my: "0.5rem",
    fontSize: "0.8rem",
  },
};
