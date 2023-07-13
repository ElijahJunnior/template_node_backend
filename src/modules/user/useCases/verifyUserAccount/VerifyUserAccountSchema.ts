import * as yup from "yup";

export const verifyUserAccountSchema = yup.object({
  activation_key: yup
    .string()
    .required("A Chave de Ativação não foi informada!")
    .trim(),
});
