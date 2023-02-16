import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";

import { Box, Stack, styled, Grid } from "@mui/material";
import { ReaderHTML, Container, Link } from "../../../components";
import { Image } from "../../../HOC";
import useMedia from "../../../hooks/useMedia";
import useSetting from "hooks/useSetting";

const ModelContainer = dynamic(() => import("./ModelContainer"), {
  ssr: false,
});

export default function HomeBanner({ data }) {
  const { banner, subtitle } = data;
  const setting = useSetting();

  const { isMdDown, isLgDown } = useMedia();

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const renderModel = useMemo(() => {
    if (!isReady) {
      return null;
    }

    const {
      banner_video,
      banner_video_text_bottom_left,
      banner_video_text_bottom_right,
      banner_video_text_top_left,
      banner_video_text_top_right,
    } = data;

    return (
      <Box
        sx={{
          cursor: "default",
          position: "relative",
          height: "100%",
          width: isMdDown ? "100%" : "50%",
          left: isMdDown ? "0%" : "50%",
          top: 0,
        }}
      >
        <Canvas shadows>
          <Suspense fallback={null}>
            <ModelContainer data={banner_video} />
          </Suspense>
        </Canvas>

        <Point
          sx={{
            top: "25%",
            left: "25%",
            position: "absolute",
            zIndex: 1,
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            {banner_video_text_top_left}
          </PointText>
        </Point>
        <Point
          sx={{
            top: "75%",
            left: "25%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            {banner_video_text_bottom_left}
          </PointText>
        </Point>
        <Point
          sx={{
            top: "25%",
            left: "75%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            {banner_video_text_top_right}
          </PointText>
        </Point>

        <Point
          sx={{
            top: "75%",
            left: "75%",
          }}
        >
          <PointLabel>?</PointLabel>
          <PointText className="help-text">
            {banner_video_text_bottom_right}
          </PointText>
        </Point>
      </Box>
    );
  }, [isReady, isMdDown, data]);

  if (!isReady) {
    return null;
  }

  if (isMdDown) {
    return (
      <Box
        sx={{
          position: "relative",
          userSelect: "none",
        }}
      >
        <Container
          sx={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            userSelect: "none",
          }}
        >
          <Grid container>
            <Grid item xs={12}>
              <Box paddingY={4}>
                <Box
                  sx={{
                    "& *": {
                      margin: 0,
                      marginBottom: "0.5rem",
                    },
                    "& h1": {
                      fontSize: "2rem",
                    },
                    "& p": {
                      fontSize: "1rem",
                    },
                  }}
                >
                  <ReaderHTML data={{ content: subtitle }} />
                </Box>

                <Stack flexDirection="row" columnGap={2}>
                  <Link target="_blank" href={setting.android_customer}>
                    <Image
                      {...{
                        src: "/img/image 3.png",
                        width: "120px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </Link>

                  <Link target="_blank" href={setting.ios_customer}>
                    <Image
                      {...{
                        src: "/img/image 4 (1).png",
                        width: "120px",
                        height: "60px",
                        objectFit: "contain",
                      }}
                    />
                  </Link>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Box
          style={{
            height: "100vh",
            position: "relative",
          }}
        >
          {renderModel}
        </Box>
        <Box
          sx={{
            marginTop: "0",
            position: "absolute",
            bottom: "6%",
            display: "hidden",
          }}
        ></Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "90vh",
        position: "relative",
        minHeight: "600px",
        backgroundImage: `url(${banner})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        userSelect: "none",
      }}
    >
      {renderModel}

      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "10rem",
          width: "50%",
          transform: "translateY(-50%)",
          // pointerEvents: "none",
          ...(isLgDown && {
            left: "5rem",
          }),
          ...(isMdDown && {
            left: "1.5rem",
          }),
        }}
      >
        <Box
          sx={{
            "& *": {
              margin: 0,
              marginBottom: "1rem",
            },
          }}
        >
          <ReaderHTML data={{ content: subtitle }} />
        </Box>

        <Stack flexDirection="row" columnGap={2}>
          <Link target="_blank" href={setting.android_customer}>
            <Image
              {...{
                src: "/img/image 3.png",
                width: "120px",
                height: "60px",
                objectFit: "contain",
              }}
            />
          </Link>

          <Link target="_blank" href={setting.ios_customer}>
            <Image
              {...{
                src: "/img/image 4 (1).png",
                width: "120px",
                height: "60px",
                objectFit: "contain",
              }}
            />
          </Link>
        </Stack>
      </Stack>
      <Box
        sx={{
          marginTop: "0",
          position: "absolute",
          bottom: "0.3%",
          display: "hidden",
        }}
      ></Box>
    </Box>
  );
}

const Point = styled(Box)(() => {
  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    ["&:hover .help-text"]: {
      opacity: 1,
    },
  };
});

const PointLabel = styled(Box)(() => {
  return {
    position: "absolute",
    top: "-20px",
    left: "-20px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#00000077",
    border: "1px solid #ffffff77",
    color: "#ffffff",
    textAlign: "center",
    cursor: "default",
    fontSize: "14px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
});

const PointText = styled(Box)(() => {
  return {
    position: "absolute",
    top: "30px",
    width: "120px",
    padding: "20px",
    borderRadius: "4px",
    background: "#00000077",
    border: "1px solid #ffffff77",
    color: "#ffffff",
    lineHeight: "1.3em",
    fontSize: "14px",
    opacity: 0,
    transition: "opacity 0.3s",
    pointerEvents: "none",
    transform: "translateX(-50%)",
  };
});
