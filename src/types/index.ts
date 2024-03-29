import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*\W).{6,20}$/;

export const infoSchema = z.object({
  name: z
    .string()
    .min(2, { message: "이름은 2글자 이상이어야 합니다." })
    .max(20, { message: "이름은 20글자 이하이어야 합니다." }),
  email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요." }),
  phone: z
    .string()
    .min(11, { message: "연락처는 11자리여야 합니다." })
    .max(11, { message: "연락처는 11자리여야 합니다." })
    .refine((value) => value.startsWith("010"), {
      message: "010으로 시작하는 11자리 숫자를 입력해주세요.",
    }),
  roles: z
    .string({ required_error: "역할을 선택해주세요" })
    .refine((value) => value === "admin" || value === "user", {
      message: "역할을 선택해주세요",
    }),
});

export const passwordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자리 이상이어야 합니다" })
    .max(20, { message: "비밀번호는 20자리 이하이어야 합니다" })
    .refine((value) => passwordRegex.test(value), {
      message:
        "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다",
    }),
  passwordConfirm: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자리 이상이어야 합니다" })
    .max(20, { message: "비밀번호는 20자리 이하이어야 합니다" })
    .refine((value) => passwordRegex.test(value), {
      message:
        "비밀번호는 최소 6자리 이상, 영문, 숫자, 특수문자를 포함해야 합니다",
    }),
});
