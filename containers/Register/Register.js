import { useEffect, useState, useCallback, useMemo } from "react";
import NumberFormat from "react-number-format";
import { Controller, useForm } from "react-hook-form";

import LoadingButton from "@mui/lab/LoadingButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import { Image } from "../../HOC";
import useMedia from "../../hooks/useMedia";
import Upload from "../../components/Form/Upload";
import { BannerTop, LineTitle, Link, SEO } from "../../components";

import { SUBMISSIONS } from "../../apis";

import axios from "../../axios.config";
import InputPhoneNumber from "../../components/Input/InputPhoneNumber";
import { registerSchema, defaultValues } from "../../libs/regierSchema";
import useSetting from "hooks/useSetting";
import { useNotification } from "hooks/useNotifaction";
import { getSeoObject } from "utils/getSeoObject";

export default function Register({ initData }) {
  const setting = useSetting();
  const { isMdDown } = useMedia();
  const [contactPage, storeCategories] = initData;
  const { banner, title, subtitle, thank_you_text, meta } =
    contactPage.items[0];
  const metaSeo = meta;

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    loadingNoti,
    setLoadingNoti,
    enqueueSnackbarWithSuccess,
    enqueueSnackbarWithError,
  } = useNotification();

  useEffect(() => {
    let timer;

    if (isSuccess) {
      timer = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccess]);
  const { clearErrors, handleSubmit, control, setError, reset } = useForm({
    defaultValues,
    resolver: registerSchema,
  });

  const onSubmit = useCallback(async (data) => {
    try {
      setLoadingNoti(true);
      const formData = new FormData();

      for (const key of Object.keys(data)) {
        if (data[key] != undefined) {
          if (key === "files") {
            if (Array.isArray(data[key])) {
              data[key].forEach((el) => {
                formData.append(key, el);
              });
            }
            continue;
          }
          formData.append(key, data[key]);
        }
      }

      await axios.post(SUBMISSIONS, formData, {
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });

      enqueueSnackbarWithSuccess(thank_you_text);
      reset(defaultValues, {
        keepDirty: false,
      });
    } catch (err) {
      enqueueSnackbarWithError(err);
    } finally {
      setIsSuccess(true);
      setLoading(false);
      setLoadingNoti(false);
    }
  }, []);

  return (
    <Box>
      <SEO {...getSeoObject(metaSeo)} />

      <BannerTop imageSrc={banner} />
      <Container maxWidth="lg" sx={{ marginBottom: 15 }}>
        <Grid container justifyContent={"center"}>
          <Grid item xs={12}>
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
              <LineTitle titleData={title} type="center" />
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box onSubmit={handleSubmit(onSubmit)} component={"form"}>
              <Controller
                name="store_name"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Tên quán / Thương hiệu"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Controller
                name="category"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Danh mục quán"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                      select
                      SelectProps={{
                        IconComponent: ExpandMoreIcon,
                      }}
                    >
                      {storeCategories.map((el) => {
                        return (
                          <MenuItem
                            key={el.id}
                            value={el.id}
                            children={
                              <Typography
                                variant="caption1"
                                children={el.name}
                              />
                            }
                          />
                        );
                      })}
                    </TextField>
                  );
                }}
              />

              <Controller
                name="presentator"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Người đại diện"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <InputPhoneNumber
                control={control}
                name="phone"
                label="Số điện thoại"
              />

              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      label="Email"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Controller
                {...{
                  name: "bank_number",
                  control,
                  render: ({ field, fieldState: { error } }) => {
                    const { onChange, ref, value } = field;

                    return (
                      <NumberFormat
                        error={!!error}
                        onChange={onChange}
                        customInput={TextField}
                        label="Số tài khoản ngân hàng"
                        value={value}
                        ref={ref}
                      />
                    );
                  },
                }}
              />

              <Controller
                name="bank"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      fullWidth
                      label="Tên ngân hàng"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Controller
                name="owner"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      fullWidth
                      label="Chủ tài khoản"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Controller
                name="branch"
                control={control}
                render={({
                  field: { onChange, ref, value },
                  fieldState: { error },
                }) => {
                  return (
                    <TextField
                      error={!!error}
                      fullWidth
                      label="Chi nhánh"
                      value={value}
                      onChange={onChange}
                      inputRef={ref}
                    />
                  );
                }}
              />

              <Upload
                {...{
                  control,
                  name: "files",
                  setError,
                  clearErrors,
                }}
              />

              <LoadingButton
                loading={loading}
                disabled={loading}
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ width: "100%" }}
              >
                ĐĂNG KÝ
              </LoadingButton>
            </Box>
          </Grid>

          <Grid item xs={12}>
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
              <LineTitle titleData={subtitle} type="center" />
            </Box>

            <Box
              sx={[
                {
                  boxShadow: " 0px 8px 24px 0 rgba(0, 0, 0, 0.15)",
                  borderRadius: "12px",
                  width: "350px",
                  height: "350px",
                  margin: "0 auto",
                  padding: "2rem",
                },
              ]}
            >
              <Image
                {...{
                  src: "/img/barcode-qr 1.png",
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>

            <Stack
              spacing={2}
              direction="column"
              alignItems={"center"}
              marginTop="40px"
            >
              <Typography
                variant="caption2_bold"
                sx={{ display: "block", textAlign: "center" }}
              >
                Chưa có ứng dụng?
              </Typography>

              <Stack spacing={2} direction="row">
                <Link target="_blank" href={setting.android_store}>
                  <Image
                    {...{
                      src: "/img/image 3.png",
                      width: "120px",
                      height: "60px",
                      objectFit: "contain",
                    }}
                  />
                </Link>

                <Link target="_blank" href={setting.ios_store}>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
