import { useMeasure } from "react-use";
import { useRouter } from "next/router";

import get from "lodash/get";

import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  Grid,
  Chip,
} from "@mui/material";

import { BannerTop, ReaderHTML, SEO } from "../../components";

import { useMedia } from "../../hooks";
import { useMemo } from "react";
import { getSeoObject } from "utils/getSeoObject";

export default function NewDetail({ initData }) {
  const [detailBlogPost] = initData;
  const metaSeo = get(detailBlogPost, "meta");

  const theme = useTheme();
  const router = useRouter();
  const { isMdDown } = useMedia();
  const [ref, { width }] = useMeasure();

  if (detailBlogPost == undefined) {
    return null;
  }

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={detailBlogPost.banner} />
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
        <Grid container>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              sx={{
                color: theme.palette.secondary.main,
                textAlign: "center",
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              {detailBlogPost.title}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <ReaderHTML data={detailBlogPost} containerWidth={width} />
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" spacing={1}>
              {get(detailBlogPost, "tags").map((el) => {
                return (
                  <Chip
                    onClick={() => {
                      router.push(`/tin-tuc?tags=${el}`);
                    }}
                    label={el}
                    key={el}
                    clickable
                    sx={{
                      backgroundColor: "secondary.light",
                      color: "common.white",
                    }}
                  />
                );
              })}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
