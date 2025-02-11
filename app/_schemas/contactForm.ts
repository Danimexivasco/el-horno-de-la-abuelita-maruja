import z from "zod";

const contanctFormSchema = z.object({
  name:    z.string().nonempty("Por favor, rellena el nombre"),
  email:   z.string().email("El email no es válido"),
  message: z.string().nonempty("Por favor, rellena el mensaje")
});

export function validateContactForm(inputs: z.infer<typeof contanctFormSchema>) {
  return contanctFormSchema.safeParse(inputs);
}