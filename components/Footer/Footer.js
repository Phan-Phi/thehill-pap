import { Fragment } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Divider, Box, useTheme, Typography, Stack } from "@mui/material";

import { useSetting, useMedia } from "../../hooks";
import { Image } from "../../HOC";

const FooterContent = dynamic(() => import("./FooterContent"));

const Footer = ({ children, ...props }) => {
  const router = useRouter();
  const { isSmDown, isMdDown, isMdUp } = useMedia();
  const theme = useTheme();
  const setting = useSetting();

  if (!setting) {
    return null;
  }
  const { social_icons } = setting;
  return (
    <Fragment>
      <Box
        id={router.pathname == "/" ? "contact" : "contacts"}
        sx={{
          paddingX: 4,
        }}
      >
        <FooterContent setting={setting} />

        <Stack
          flexDirection="row"
          columnGap={3}
          justifyContent={isMdDown ? "center" : "space-between"}
          alignItems={"center"}
          sx={{
            flexWrap: "wrap",
            color: theme.palette.primary.main,
            marginBottom: 3,
            position: "relative",
          }}
        >
          {isMdUp && <Box sx={{ width: "32%" }}></Box>}
          <Stack
            flexDirection="row"
            columnGap={3}
            sx={{ marginLeft: "0 !important" }}
          >
            {social_icons.map((item, idx) => {
              const { value } = item;

              if (value.link) {
                return (
                  <Typography
                    component="a"
                    key={idx}
                    target="_blank"
                    href={value.link}
                    sx={{
                      [theme.breakpoints.up("md")]: {
                        transition: "all 0.5s",
                        "&:hover": {
                          transform: "scale(1.5)",
                        },
                      },
                    }}
                  >
                    <Image
                      {...{
                        src: value.icon,
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  </Typography>
                );
              } else {
                return (
                  <Fragment key={idx}>
                    <Image
                      {...{
                        src: value.icon,
                        width: "24px",
                        height: "24px",
                        objectFit: "contain",
                      }}
                    />
                  </Fragment>
                );
              }
            })}
          </Stack>

          {isMdUp && (
            <Stack
              direction="row"
              spacing={1}
              sx={{
                width: "32%",
                marginLeft: "0 !important",
              }}
            >
              <Image
                {...{
                  src: "/img/image 6.png",
                  width: "120px",
                  height: "60px",
                }}
              />
              <Image
                {...{
                  src: "/img/image 7.png",
                  width: "120px",
                  height: "60px",
                }}
              />
            </Stack>
          )}
        </Stack>

        {isMdDown && (
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            marginBottom={3}
          >
            <Image
              {...{
                src: "/img/image 6.png",
                width: "120px",
                height: "60px",
              }}
            />
            <Image
              {...{
                src: "/img/image 7.png",
                width: "120px",
                height: "60px",
              }}
            />
          </Stack>
        )}
      </Box>

      <Box
        sx={[
          {
            width: "100%",
          },
        ]}
      >
        <Divider
          sx={[
            {
              width: "60vw",
              marginX: "auto",
            },
            isSmDown && {
              width: "100%",
            },
          ]}
        />

        <Typography
          variant="hairline2"
          sx={{
            marginY: 4,
            display: "block",
            textAlign: "center",
            color: theme.palette.common.neutral2,
            textTransform: "uppercase",
          }}
        >
          Copyright © 2022 Đổi Điểm. All rights reserved
        </Typography>
      </Box>
    </Fragment>
  );
};

export default Footer;
