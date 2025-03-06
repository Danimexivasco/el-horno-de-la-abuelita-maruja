import z from "zod";

const signInForm = z.object({
  email:    z.string().email("El email no es válido"),
  password: z.string().nonempty("Por favor, rellena el mensaje").min(6, "La contraseña debe tener al menos 6 caracteres")
});

export function validateSignInForm(inputs: z.infer<typeof signInForm>) {
  return signInForm.safeParse(inputs);
}