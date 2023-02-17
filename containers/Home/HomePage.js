import { get } from "lodash";
import { Box } from "@mui/material";

import AboutExchangePoint from "./components/AboutExchangePoint";
import CustomerBenefit from "./components/CustomerBenefit";
import StoreBenefit from "./components/StoreBenefit";
import TopBanner from "./components/TopBanner";
import Featured from "./components/Featured";
import Brand from "./components/Brand";
import News from "./components/News";
import SEO from "components/SEO";
import { getSeoObject } from "utils/getSeoObject";

const HomePage = ({ initData }) => {
  const [homeData, blogHome, brandHome] = initData;

  const metaData = homeData.items?.[0];
  const blogHomeData = blogHome.items;
  const brandHomeData = brandHome.items;
  const metaSeo = get(metaData, "meta");

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <TopBanner data={metaData} />

      <AboutExchangePoint data={metaData} />

      <CustomerBenefit data={metaData} />

      <Brand data={metaData} brandHomeData={brandHomeData} />

      <StoreBenefit data={metaData} />

      <Featured data={metaData} />

      <News data={metaData} blogHomeData={blogHomeData} />
    </Box>
  );
};

export default HomePage;
