import { Fab } from "@mui/material";
import { RMScaffold } from "../components/AppScafold/AppScaffold";

export const HomePage = () => {
  const fabAction = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <RMScaffold />
      <Fab
        color="primary"
        aria-label="add"
        style={{
          position: "fixed",
          bottom: "5%",
          right: "5%",
        }}
        sx={{
          display: () => {
            return window.pageYOffset > 0 ? "none" : "flex";
          },
        }}
        onClick={fabAction}
      >
        <i
          className="fas fa-arrow-up"
          style={{ color: "#fff", fontSize: 18 }}
        ></i>
      </Fab>
    </>
  );
};
