import useSetting from "hooks/useSetting";
import { NextSeo } from "next-seo";

const SEO = (props) => {
  const setting = useSetting();

  const { title, description, image, locale } = props;
  const { favicon } = setting;

  return (
    <NextSeo
      title={title || company || ""}
      description={description || ""}
      openGraph={{
        title: "Đổi Điểm - Tích Bao Nhiêu Điểm, Đổi Bấy Nhiêu Tiền.",
        description:
          description ||
          "Ứng dụng tích điểm, đổi ưu đãi tuyệt vời tại Việt Nam. Tải ngay để ăn uống và mua sắm thả ga cùng với ứng dụng Đổi Điểm.",
        site_name: "Đổi Điểm - Tích Bao Nhiêu Điểm, Đổi Bấy Nhiêu Tiền.",
        locale: locale ?? "vi",
        images: [
          {
            url: image || "/og_image.png",
            alt: title,
            type: "image/jpeg",
          },
        ],
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: favicon || "/fav.png",
        },
        {
          rel: "apple-touch-icon",
          href: favicon || "/fav.png",
        },
      ]}
    />
  );
};

export default SEO;
