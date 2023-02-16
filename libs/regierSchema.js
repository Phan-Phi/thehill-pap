import { string, object, mixed } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";

export const defaultValues = {
  store_name: "",
  presentator: "",
  category: "",
  email: "",
  phone: "",
  bank_number: "",
  bank: "",
  owner: "",
  branch: "",
  files: null,
};

export const registerSchema = yupResolver(
  object().shape({
    store_name: string("Vui lòng nhập nội dung").required(),
    presentator: string("Vui lòng nhập nội dung").required(),
    category: string("Vui lòng nhập nội dung").required(),
    phone: string()
      .required()
      .test({
        test: (value) => {
          if (value) {
            const phoneNumber = parsePhoneNumber(value);

            if (phoneNumber) {
              if (phoneNumber.country !== "VN") {
                return false;
              }
              if (isValidPhoneNumber(phoneNumber.number)) {
                return true;
              } else {
                return false;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        },
        message: "Số điện thoại không hợp lệ",
        name: "validate",
      }),
    email: string("Vui lòng nhập nội dung")
      .required()
      .email("Vui lòng nhập đúng định dạng email"),
    bank: string("Vui lòng nhập nội dung").required(),
    bank_number: string("Vui lòng nhập nội dung").required(),
    owner: string("Vui lòng nhập nội dung").required(),
    branch: string("Vui lòng nhập nội dung").required(),
    files: mixed().nullable(),
  })
);
