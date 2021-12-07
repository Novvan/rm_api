import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import EpisodeTabs from "../components/EpisodeTabs/EpisodeTabs";
import LoadingIndicator from "../components/LoadingIndicator/LoadingIndicator";
import { Character } from "../models/RickMortyCharacters";
import { RootState } from "../store";
import { setSelectedCharacter } from "../store/features/SelectedCharacter/SelectedCharacterSlice";
import { AXIOS_UTILS } from "../utils/RickAndMortyApi";

export const CharacterPage = () => {
  const { id } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const SelectedCharacter = useSelector(
    (state: RootState) => state.SelectedCharacter.value
  );
  const dispatch = useDispatch();

  const buildDetails = (label: string, value: string) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          gap: 1,
        }}
      >
        <Typography variant="h6">{label}:</Typography>
        <Typography variant="subtitle1">{value}</Typography>
      </Box>
    );
  };

  useEffect(() => {
    if (SelectedCharacter === null && id !== undefined) {
      AXIOS_UTILS.CHARACTERS.GET_CHARACTER(parseInt(id))
        .then((res) => {
          var selectedChar: Character = {
            id: res.data.id,
            name: res.data.name,
            status: res.data.status,
            species: res.data.species,
            type: res.data.type,
            gender: res.data.gender,
            origin: {
              name: res.data.origin.name,
              url: res.data.origin.url,
            },
            location: {
              name: res.data.location.name,
              url: res.data.location.url,
            },
            image: res.data.image,
            episode: res.data.episode,
            url: res.data.url,
            created: res.data.created,
          };
          dispatch(setSelectedCharacter(selectedChar));
          setIsLoading(false);
        })
        .catch((err) => {
          alert("There's been an error");
          console.log(err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            gap: 5,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {
              navigate("/");
            }}
            sx={{ ml: 2 }}
          >
            <i className="fas fa-arrow-left"></i>
          </IconButton>
          <Link to="/">
            <img src="https://img.icons8.com/plasticine/50/000000/rick-sanchez.png" />
            <img src="https://img.icons8.com/plasticine/50/000000/morty-smith.png" />
          </Link>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            {SelectedCharacter?.name}
          </Typography>
        </Toolbar>
      </AppBar>
      {!isLoading && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: {
                xs: 2,
                md: 15,
              },
              mt: {
                xs: 15,
              },
            }}
          >
            <img
              src={SelectedCharacter?.image}
              style={{
                borderRadius: "15px",
                width: "50%",
                margin: "auto",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                gap: 0,
                margin: "auto",
                width: "350px",
              }}
            >
              {SelectedCharacter !== null && (
                <>
                  {buildDetails("Id", SelectedCharacter.id.toString())}
                  {buildDetails("Name", SelectedCharacter.name)}
                  {buildDetails("Status", SelectedCharacter.status)}
                  {buildDetails("Species", SelectedCharacter.species)}
                  {SelectedCharacter.type !== "" &&
                    buildDetails("Type", SelectedCharacter.type)}
                  {buildDetails("Gender", SelectedCharacter.gender)}
                  {buildDetails("Origin", SelectedCharacter.origin.name)}
                  {buildDetails(
                    "Created",
                    SelectedCharacter.created.toString()
                  )}
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: {
                xs: "90%",
                sm: "50%",
              },
              margin: {
                xs: "auto",
                md: "auto",
              },
              marginTop: {
                xs: "35px",
              },
            }}
          >
            {SelectedCharacter?.episode !== null &&
              SelectedCharacter?.episode !== undefined && (
                <>
                  <Typography
                    variant="h6"
                    sx={{
                      marginBottom: "10px",
                      marginLeft: "10px",
                    }}
                  >
                    Episodes Info
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      margin: "auto",
                    }}
                  >
                    <EpisodeTabs episodes={SelectedCharacter.episode} />
                  </Box>
                </>
              )}
          </Box>
        </>
      )}
      {isLoading && (
        <Box
          sx={{
            margin: "auto",
          }}
        >
          <LoadingIndicator />
        </Box>
      )}
    </>
  );
};
