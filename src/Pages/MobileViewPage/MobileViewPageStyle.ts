export const style = {
  container: {
    boxSizing: "border-box",
    bgcolor: "#EEEEEE",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  },
  innerWrapperLeft: {
    flexGrow: 1,
    bgcolor: "white",
  },
  profileTabLeft: {
    bgcolor: "#EEEEEE",
    px: "1rem",
    py: "0.7rem",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileList: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    px: "1rem",
    py: "0.7rem",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
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
  status: {
    fontSize: "0.8rem",
    color: "#1BD660",
    textAlign: "start",
  },
  time: {
    fontSize: "0.8rem",
    color: "rgba(0,0,0,0.6)",
  },
};
