import {
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Box,
  Drawer,
} from "@mui/material";
import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCharacterList } from "../../store/features/CharacterList/CharacterListSlice";
import { AXIOS_UTILS } from "../../utils/RickAndMortyApi";
import { CharacterGrid } from "../CharacterGrid/CharacterGrid";
import { FilterForm } from "../Filters/FilterForm";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

const drawerWidth = 320;

export const RMScaffold = (props: any) => {
  const { window } = props;
  const [page, setPage] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [params, setParams] = useState("");
  const dispatch = useDispatch();

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleCharList = (page: number = 1) => {
    setPage(page);
    setIsFiltered(false);
    setIsLoading(true);
    AXIOS_UTILS.CHARACTERS.GET_LIST(page)
      .then((res) => {
        dispatch(setCharacterList(res.data));
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err.response !== undefined) alert(err.response.data.error);
        setIsLoading(false);
      });
  };

  const handleFilteredCharList = (page: number = 1, params: string = "") => {
    setPage(page);
    setIsFiltered(true);
    setIsLoading(true);
    setParams(params);
    AXIOS_UTILS.CHARACTERS.GET_LIST(page, params)
      .then((res) => {
        dispatch(setCharacterList(res.data));
        setIsLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err.response !== undefined) alert(err.response.data.error);
        setIsLoading(false);
      });
  };

  const prevPage = () => {
    if (page !== 1) setPage(page - 1);
    else return;
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    !isFiltered ? handleCharList(page) : handleFilteredCharList(page, params);
  }, [page]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Toolbar
        style={{
          alignSelf: "flex-end",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { lg: "none" } }}
        >
          <i className="fas fa-times"></i>
        </IconButton>
      </Toolbar>
      <Divider />
      <FilterForm
        clearHandler={handleCharList}
        paramsHandler={handleFilteredCharList}
        drawerToggle={handleDrawerToggle}
      />
    </div>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: { lg: `calc(100% - ${drawerWidth}px)` },
          ml: { lg: `${drawerWidth}px` },
        }}
      >
        <Toolbar
          sx={{
            width: "100vw",
            gap: 5,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { lg: "none" } }}
          >
            <i className="fas fa-bars"></i>
          </IconButton>
          <Link to="/">
            <img src="https://img.icons8.com/plasticine/50/000000/rick-sanchez.png" />
            <img src="https://img.icons8.com/plasticine/50/000000/morty-smith.png" />
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="Filters"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { lg: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {!isLoading && (
          <Box
            sx={{
              ml: { lg: `${drawerWidth}px` },
              mx: { xs: "auto" },
            }}
          >
            <CharacterGrid
              npHandler={nextPage}
              ppHandler={prevPage}
              currentPage={page}
            />
          </Box>
        )}
        {isLoading && (
          <Box
            sx={{
              ml: { lg: `${drawerWidth}px` },
              mx: { xs: "auto" },
            }}
          >
            <LoadingIndicator />
          </Box>
        )}
      </Box>
    </>
  );
};
