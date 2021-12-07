import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Grid,
  Typography,
  Box,
  ButtonGroup,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store";
import { setSelectedCharacter } from "../../store/features/SelectedCharacter/SelectedCharacterSlice";

export const CharacterGrid = (props: any) => {
  const navigate = useNavigate();
  const CharacterList = useSelector(
    (state: RootState) => state.CharacterList.value
  );
  const dispatch = useDispatch();

  const texts = {
    prev: "<",
    mid: `Page ${props.currentPage} of ${CharacterList.info.pages}`,
    next: ">",
  };

  const handlePrev = () => props.ppHandler();
  const handleNext = () => props.npHandler();

  const selectCharacter = (idx: number, id: number) => {
    dispatch(setSelectedCharacter(CharacterList.results[idx]));
    navigate(`/character/${id}`);
  };

  return (
    <Box>
      <ButtonGroup size="large" aria-label="large button group" sx={{ my: 2 }}>
        <Button
          onClick={handlePrev}
          disabled={props.currentPage == 1 ? true : false}
        >
          {texts.prev}
        </Button>
        <Button style={{ color: "black" }} disabled>
          {texts.mid}
        </Button>
        <Button
          onClick={handleNext}
          disabled={
            props.currentPage == CharacterList.info.pages ? true : false
          }
        >
          {texts.next}
        </Button>
      </ButtonGroup>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 8, md: 12 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {CharacterList.results.map((character, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Card sx={{ maxWidth: 345, maxHeight: 400 }}>
              <CardMedia component="img" height="200" image={character.image} />
              <CardContent style={{ display: "block" }}>
                <Typography gutterBottom noWrap variant="h6" component="div">
                  {character.name}
                </Typography>
                <Typography
                  gutterBottom
                  noWrap
                  variant="subtitle1"
                  component="div"
                >
                  {character.species}
                </Typography>
                <Chip
                  label={character.status}
                  sx={{
                    backgroundColor: () => {
                      if (character.status === "Alive") {
                        return "#2ecc71";
                      } else if (character.status === "Dead") {
                        return "#e74c3c";
                      } else {
                        return "#bdc3c7";
                      }
                    },
                    color: () => {
                      if (character.status === "Alive") {
                        return "#ecf0f1";
                      } else if (character.status === "Dead") {
                        return "#ecf0f1";
                      } else {
                        return "#2c3e50";
                      }
                    },
                  }}
                />
              </CardContent>
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  size="medium"
                  variant="contained"
                  onClick={() => selectCharacter(index, character.id)}
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
