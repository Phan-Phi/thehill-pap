import Slider from "react-slick";
import { useEffect, useMemo, useRef } from "react";
import { Box, Button, Container, Grid } from "@mui/material";

import CardBrand from "../../../components/Card/CardBrand";
import LineTitle from "../../../components/LineTitle/LineTitle";
import Link from "../../../components/Link";

import { useMedia } from "../../../hooks";
import { Image } from "../../../HOC";

const settings = {
  dots: false,
  infinite: true,
  speed: 200,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  centerMode: false,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: false,
      },
    },
  ],
};

export default function Brand({ data, brandHomeData }) {
  const slickRef = useRef();
  const { partner_title } = data;
  const { isSmDown, isSmUp } = useMedia();

  const renderCardBrand = useMemo(() => {
    return brandHomeData.map((item, index) => {
      if (isSmUp) {
        return (
          <Grid item key={index} sm={6} md={3}>
            <CardBrand data={item} />
          </Grid>
        );
      } else {
        return (
          <Grid item key={index} xs={6}>
            <CardBrand data={item} />
          </Grid>
        );
      }
    });
  }, [brandHomeData, isSmUp]);

  useEffect(() => {
    if (slickRef.current) {
      slickRef.current.innerSlider.list.style.padding = "0 75px 0 0";
    }
  }, [slickRef, isSmDown]);

  return (
    <Box
      sx={[
        {
          position: "relative",
          paddingBottom: 10,
        },
        isSmDown && {
          paddingBottom: 6,
        },
      ]}
    >
      <Container maxWidth="lg">
        <Grid item xs={12}>
          <Box
            sx={[
              {
                paddingTop: 5,
                paddingBottom: 8,
              },
              isSmDown && {
                paddingBottom: 5,
              },
            ]}
          >
            <LineTitle titleData={partner_title} type="left" />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={{
              overflowX: "hidden",

              "& .slick-slide": {
                width: "100%",
                margin: "0 20px",
                paddingBottom: 2,
              },
              "& button": {
                display: "none",
              },
              "& .slick-track": {
                display: "flex",
              },
            }}
          >
            <Slider ref={slickRef} {...settings}>
              {renderCardBrand}
            </Slider>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            sx={[
              {
                textAlign: "center",
                paddingTop: 5,
              },
              isSmDown && {
                paddingTop: 3,
              },
            ]}
          >
            <Link href="/doi-tac" sx={{ textDecoration: "none" }}>
              <Button variant="outlined">XEM THÊM</Button>
            </Link>
          </Box>
        </Grid>
      </Container>

      {data?.partner_image && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        >
          <Image
            src={data.partner_image}
            height={"100%"}
            width="100%"
            objectFit="cover"
          />
        </Box>
      )}
    </Box>
  );
}
