import { useEffect, useRef } from "react";
import { useMeasure } from "react-use";
import { Player, ControlBar } from "video-react";
import { Box, Grid, Typography, useTheme } from "@mui/material";

import { Image } from "../../../HOC";

import { LineTitle, Container } from "../../../components";
import { useMedia } from "../../../hooks";

export default function ExchangePointsHome({ data }) {
  const theme = useTheme();
  const { about_title, about_content } = data;
  const { isMdDown } = useMedia();

  return (
    <Container
      id="about"
      maxWidth="lg"
      sx={[
        {
          paddingBottom: 10,
        },
        isMdDown && {
          paddingBottom: 6,
        },
      ]}
    >
      <Box
        sx={[
          {
            paddingTop: 5,
            paddingBottom: 8,
          },
          isMdDown && {
            paddingBottom: 5,
          },
        ]}
      >
        <LineTitle type="left" titleData={about_title} />
      </Box>

      <Grid container rowSpacing={4} columnSpacing={8} justifyContent="center">
        {about_content.map((item, index) => {
          return (
            <Grid
              item
              xs={12}
              md={4}
              key={index}
              sx={{
                [theme.breakpoints.up("md")]: {
                  transition: "all 0.5s",
                  "&:hover": {
                    transform: "translateY(-20px)",
                  },
                },
              }}
            >
              <CardItem data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
}

const CardItem = ({ data }) => {
  const videoRef = useRef(null);
  const [ref, { width }] = useMeasure();

  const { block_type, value } = data;
  const { image, description, video } = value;

  useEffect(() => {
    if (ref.current) {
      videoRef.current.actions.play();
    }
  }, []);

  return (
    <Box ref={ref} className="CardItem">
      {block_type === "image_content" ? (
        <Image
          {...{
            src: image,
            width: "100%",
            height: (width * 420) / 315,
            objectFit: "cover",
          }}
        />
      ) : (
        <Box
          width={width}
          sx={{
            overflow: "hidden",
            pointerEvents: "none",
          }}
          height={(width * 420) / 315}
        >
          <Player
            autoPlay
            muted
            loop
            playsInline
            fluid={false}
            type="video/mp4"
            width="100%"
            height="100%"
            ref={(player) => {
              videoRef.current = player;
            }}
          >
            <source src={video.file} />
            <ControlBar
              disableCompletely={true}
              autoHide={false}
              disableDefaultControls={true}
            />
          </Player>
        </Box>
      )}

      <Typography
        variant="body2"
        sx={{ marginTop: "1.5rem", textAlign: "justify" }}
      >
        {description}
      </Typography>
    </Box>
  );
};
