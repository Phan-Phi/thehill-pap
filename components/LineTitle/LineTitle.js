import { Fragment } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";

import { useMedia } from "../../hooks";

const LineTitle = ({ titleData, subtitleData, type, sx }) => {
  const { isSmDown } = useMedia();
  const theme = useTheme();

  if (type === "right") {
    return (
      <Fragment>
        <Stack
          spacing={4}
          direction="row"
          alignItems="center"
          sx={[
            isSmDown && {
              justifyContent: "center",
            },
          ]}
        >
          <Box
            sx={{
              flexGrow: "1",
              display: isSmDown ? "none" : "block",
            }}
          >
            <Box
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                border: `1px solid ${theme.palette.secondary.main}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  right: 0,
                  zIndex: 1,
                  background: theme.palette.secondary.main,
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
          <Box
            sx={[
              isSmDown && {
                justifyContent: "center",
                marginLeft: "0 !important",
              },
            ]}
          >
            <Typography
              variant={isSmDown ? "h6" : "h4"}
              sx={{ color: theme.palette.secondary.main, textAlign: "center" }}
            >
              {titleData}
            </Typography>
          </Box>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            marginTop: "1rem",
            color: theme.palette.secondary.light,
            textAlign: "right",
            display: isSmDown ? "none" : "block",
          }}
        >
          {subtitleData}
        </Typography>
      </Fragment>
    );
  } else if (type === "left") {
    return (
      <Fragment>
        <Stack
          spacing={4}
          direction="row"
          alignItems="center"
          sx={[
            isSmDown && {
              justifyContent: "center",
            },
          ]}
        >
          <Typography
            variant={isSmDown ? "h6" : "h4"}
            sx={{ color: theme.palette.primary.main }}
          >
            {titleData}
          </Typography>
          <Box sx={{ flexGrow: "1", display: isSmDown ? "none" : "block" }}>
            <Box
              sx={{
                color: theme.palette.primary.main,
                position: "relative",
                border: "1px solid red",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  left: -10,
                  zIndex: 1,
                  background: "red",
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
        </Stack>
        <Typography
          variant="body1"
          sx={{
            marginTop: "1rem",
            color: theme.palette.primary.main,
            textAlign: "left",
            display: isSmDown ? "none" : "block",
          }}
        >
          {subtitleData}
        </Typography>
      </Fragment>
    );
  } else if (type === "center") {
    return (
      <Fragment>
        <Stack
          direction="row"
          alignItems="center"
          sx={[
            isSmDown && {
              justifyContent: "center",
            },
          ]}
        >
          <Box
            sx={[
              { marginRight: "2.5rem", flexGrow: "1" },
              isSmDown && { display: "none" },
            ]}
          >
            <Box
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                border: `1px solid ${theme.palette.secondary.main}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  right: 0,
                  zIndex: 1,
                  background: theme.palette.secondary.main,
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
          <Box>
            <Typography
              variant={isSmDown ? "h3" : "h4"}
              sx={{ color: theme.palette.secondary.main, textAlign: "center" }}
            >
              {titleData}
            </Typography>
          </Box>
          <Box
            sx={[
              { flexGrow: "1", marginLeft: "2.5rem" },
              isSmDown && { display: "none" },
            ]}
          >
            <Box
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                border: `1px solid ${theme.palette.secondary.main}`,
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "10px",
                  height: "10px",
                  top: "50%",
                  left: -10,
                  zIndex: 1,
                  background: theme.palette.secondary.main,
                  transform: "rotate(45deg) translateY(-70%)",
                },
              }}
            ></Box>
          </Box>
        </Stack>
      </Fragment>
    );
  }
};

export default LineTitle;
