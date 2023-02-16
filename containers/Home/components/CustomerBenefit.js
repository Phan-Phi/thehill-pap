import {
  Grid,
  Typography,
  Container,
  useTheme,
  Stack,
  Box,
} from "@mui/material";
import { useMeasure } from "react-use";
import LineTitle from "../../../components/LineTitle/LineTitle";
import { Image } from "../../../HOC";

import useMedia from "../../../hooks/useMedia";

//

const RATIO = 540 / 310;

const HomeBenefit = ({ data, ...props }) => {
  const [ref, { width }] = useMeasure();
  const {
    customer_title,
    customer_subtitle,
    customer_content,
    customer_image,
  } = data;
  const { isMdDown } = useMedia();
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={[
        {
          paddingBottom: 10,
        },
        isMdDown && {
          paddingBottom: 6,
        },
      ]}
      ref={ref}
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
          titleData={customer_title}
          subtitleData={customer_subtitle}
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
        <Grid item xs={12} md={6}>
          <Image
            src={customer_image}
            width={"100%"}
            height={isMdDown ? width * RATIO : "100%"}
            objectFit="contain"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack
            sx={[
              {
                paddingRight: 10,
                paddingY: 10,
              },
              isMdDown && {
                paddingRight: 0,
                paddingY: 0,
                paddingTop: 5,
              },
            ]}
            spacing={3}
          >
            {customer_content.map((item, idx) => {
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
      </Grid>
      <Box id="partner"></Box>
    </Container>
  );
};

export default HomeBenefit;
