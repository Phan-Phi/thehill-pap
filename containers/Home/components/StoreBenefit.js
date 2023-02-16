import {
  Grid,
  Typography,
  Stack,
  Container,
  useTheme,
  Box,
} from "@mui/material";
import { useMeasure } from "react-use";
import LineTitle from "../../../components/LineTitle/LineTitle";
import { Image } from "../../../HOC";
import useMedia from "../../../hooks/useMedia";

const RATIO = 540 / 310;

const StoreBenefit = ({ data, ...props }) => {
  const [ref, { width }] = useMeasure();
  const { store_title, store_subtitle, store_content, store_image } = data;
  const { isSmDown, isMdDown, isSmUp } = useMedia();
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      ref={ref}
      sx={[
        {
          paddingBottom: 11,
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
        <LineTitle
          titleData={store_title}
          subtitleData={store_subtitle}
          type="right"
        />
      </Box>

      <Grid
        container
        justifyContent="center"
        sx={[
          {
            borderRadius: "1rem",
            border: "2px solid rgba(177, 181, 195, 0.1)",
            backgroundColor: "rgba(244, 244, 244, 0.6)",
          },
          isMdDown && {
            background: "none",
            border: "none",
          },
        ]}
      >
        <Grid item xs={12} md={6} order={isMdDown && 2}>
          <Stack
            sx={[
              {
                paddingLeft: 10,
                paddingY: 10,
              },
              isMdDown && {
                paddingLeft: 0,
                paddingY: 0,
                paddingTop: 5,
              },
            ]}
            spacing={3}
          >
            {store_content.map((item, idx) => {
              return (
                <Stack flexDirection={"row"} alignItems="center" key={idx}>
                  <Box
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        transition: "all 0.5s",
                        "&:hover": {
                          transform: "scale(1.2)",
                        },
                      },
                    }}
                  >
                    <Image
                      src={item.value.icon}
                      width="120px"
                      height="120px"
                      objectFit="contain"
                    />
                  </Box>

                  <Stack
                    sx={{
                      paddingLeft: 2,
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        color: theme.palette.secondary.light,
                        marginBottom: "1rem",
                      }}
                    >
                      {item.value.title}
                    </Typography>

                    <Typography variant="body2">
                      {item.value.description}
                    </Typography>
                  </Stack>
                </Stack>
              );
            })}
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} order={isMdDown && 1}>
          <Image
            src={store_image}
            width="100%"
            height={isMdDown ? width * RATIO : "100%"}
            objectFit="contain"
          />
        </Grid>
      </Grid>
      <Box id="tutorial"></Box>
    </Container>
  );
};

export default StoreBenefit;
