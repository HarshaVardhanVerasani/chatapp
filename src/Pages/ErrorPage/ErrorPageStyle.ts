export const style = {
  txt: {
    fontWeight: 900,
    fontSize: "6rem",
    backgroundImage: "linear-gradient(90deg, #8d8585 75%, #ffffff 50%)",
    backgroundSize: "200% auto",
    color: "#fff",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    textFillColor: "transparent",
    WebkitTextFillColor: "transparent",
    animation: "textclip 3s cubic-bezier(0.34, 0.45, 0.84, 0.38) infinite",
    "@keyframes textclip": {
      to: {
        "background-position": "-200% center",
      },
    },
  },
};
