import { useMemo } from "react";
import { Tab, Tabs as MuiTabs, useTheme } from "@mui/material";

import { useMedia } from "../../hooks";

const Tabs = ({ value, changeTab, data }) => {
  const { isSmUp, isSmDown } = useMedia();
  const theme = useTheme();
  if (!data) {
    return null;
  }
  const renderTab = useMemo(() => {
    return data.map((el) => {
      return (
        <Tab
          key={el.id}
          label={el.title}
          value={el.id}
          disableRipple
          sx={[
            {
              padding: "8px 16px",
              [theme.breakpoints.down("sm")]: {
                paddingLeft: 0,
                paddingRight: 0,
                "&:not(:first-of-type)": {
                  marginLeft: 2,
                },
              },
            },
            isSmUp && {
              minWidth: "20px",
            },
          ]}
        />
      );
    });
  }, [data, isSmUp]);

  if (isSmUp) {
    return (
      <MuiTabs
        value={value}
        onChange={changeTab}
        variant={isSmUp ? "standard" : "fullWidth"}
        sx={[
          {
            marginX: "auto",
            marginBottom: 10,
          },
          {
            "& .Mui-selected": {
              color: `${theme.palette.common.white} !important`,
              backgroundColor: theme.palette.secondary.light,
              borderRadius: "5px",
            },
            "& button": {
              minWidth: "auto",
              margin: "0 1rem",
            },
            "& .MuiTabs-flexContainer": {
              justifyContent: "center",
              width: "100%",
              margin: "0 auto",
            },
          },
        ]}
      >
        {renderTab}
      </MuiTabs>
    );
  } else {
    return (
      <MuiTabs
        value={value}
        onChange={changeTab}
        variant={isSmUp ? "standard" : "fullWidth"}
        sx={{
          overflowX: "scroll",
          marginLeft: "auto",
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          "& .Mui-selected": {
            color: `${theme.palette.common.white} !important`,
            backgroundColor: theme.palette.secondary.light,
            borderRadius: "5px",
          },
          "& button": {
            minWidth: "5.6rem",
            // margin: "0 0.3rem",
          },
          "& .MuiTabs-scroller": {
            overflowX: "scroll !important",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
      >
        {renderTab}
      </MuiTabs>
    );
  }
};

export default Tabs;
