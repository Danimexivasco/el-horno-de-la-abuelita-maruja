"use client";

import Button from "@/app/_components/button";
import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import { useAuthState } from "@/app/_libs/firebase/auth";
import { showMsg } from "@/app/_utils/showMsg";
import { HOME_PATH, PRODUCTS_PATH } from "@/routes";
import { sendEmailVerification } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [user, loading] = useAuthState();
  const router = useRouter();

  const checkVerification = async () => {
    if (user) {
      await user.reload();

      if (user?.emailVerified) {
        showMsg("Gracias por verificar tu email 🚀", "success");

        router.push(HOME_PATH);
      } else {
        showMsg("Hubo un error al verificar tu email", "error");
      }
    }
  };

  const resendEmailVerification = async () => {
    if (user) {
      try {
        await sendEmailVerification(user);

        showMsg("Se ha reenviado el email de verificacion", "success");
      } catch {
        showMsg("Ocurrio un error al reenviar el email de verificacion", "error");

        throw new Error("Ocurrio un error al reenviar el email de verificacion");
      }
    }
  };

  if (loading) return <Container>Verificando datos...</Container>;

  return user ? (
    <Container className="prose-base">
      {!user.emailVerified ? (
        <>
          <Headline>Verifique su email</Headline>
          <p>Por favor, necesitamos que verifiques tu email con el enlace que te hemos mandado a <strong>{user?.email}</strong></p>
          <div className="grid lg:flex gap-4 items-center">
            <Button onClick={checkVerification}>Ya lo he verificado</Button>
            <Button onClick={resendEmailVerification}>Reenviarme el enlace</Button>
          </div>
        </>
      ) : (
        <>
          <p>Tu usuario está verificado, puedes continuar con tu compra 😁</p>
          <Link
            asButton
            href={PRODUCTS_PATH}
          >Ir a la tienda
          </Link>
        </>
      )}
    </Container>
  ) : null;
}