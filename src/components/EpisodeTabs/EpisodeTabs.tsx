import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { AXIOS_UTILS } from "../../utils/RickAndMortyApi";
import { AxiosError } from "axios";
import { Convert, RickAndMortyEpisodes } from "../../models/RickMortyEpisodes";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function EpisodeTabs(props: any) {
  const [value, setValue] = React.useState(0);
  const [episodes, setEpisodes] = React.useState<RickAndMortyEpisodes[]>([]);
  const [loading, setLoading] = React.useState(true);
  const propEpisodes = props.episodes;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const buildDetails = (label: string, value: string) => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "baseline",
          textAlign: "start",
          gap: 1,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              sm: "1rem",
              md: "1.75rem",
            },
          }}
        >
          {label}:
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: {
              sm: "0.8rem",
              md: "1.4rem",
            },
          }}
        >
          {value}
        </Typography>
      </Box>
    );
  };

  React.useEffect(() => {
    propEpisodes.forEach((episode: string) => {
      AXIOS_UTILS.EPISODES.GET_EPISODE(episode)
        .then((res) => {
          var stringify = JSON.stringify(res.data);
          var newEpisode = Convert.toRickAndMortyEpisodes(stringify);
          setEpisodes((prevEpisodes) => [...prevEpisodes, newEpisode]);
        })
        .catch((err: AxiosError) => {
          console.log(err);
        });
    });
    setLoading(false);
  }, [propEpisodes]);

  return (
    <Box sx={{ width: "100%" }}>
      {!loading && (
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Episode tabs"
              variant="scrollable"
            >
              {episodes.map((episode: RickAndMortyEpisodes, index: number) => (
                <Tab
                  key={index}
                  label={`Episode ${episode.id}`}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          {episodes
            .sort((a, b) => {
              return a.id - b.id;
            })
            .map((episode: RickAndMortyEpisodes, index: number) => (
              <TabPanel key={index} value={value} index={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    gap: 0,
                  }}
                >
                  {buildDetails("Episode Id", episode.id.toString())}
                  {buildDetails("Episode Name", episode.name)}
                  {buildDetails("Episode Air Date", episode.airDate)}
                  {buildDetails("Episode", episode.episode)}
                </Box>
              </TabPanel>
            ))}
        </>
      )}
    </Box>
  );
}
