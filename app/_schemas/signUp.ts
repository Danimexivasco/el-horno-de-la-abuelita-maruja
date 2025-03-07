import z from "zod";

const signUpForm = z.object({
  username: z.string().nonempty("Por favor, rellena el nombre"),
  email:    z.string().email("El email no es válido"),
  password: z.string().nonempty("Por favor, rellena el mensaje").min(6, "La contraseña debe tener al menos 6 caracteres")
});

export function validateSignUpForm(inputs: z.infer<typeof signUpForm>) {
  return signUpForm.safeParse(inputs);
}