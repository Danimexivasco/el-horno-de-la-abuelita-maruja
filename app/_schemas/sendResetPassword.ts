import z from "zod";

const sendResetPasswordSchema = z.object({
  email: z.string().email("El email no es valido")
});

export const validateSendResetPassword = sendResetPasswordSchema.safeParse;

export function validateContactForm(inputs: z.infer<typeof sendResetPasswordSchema>) {
  return sendResetPasswordSchema.safeParse(inputs);
}