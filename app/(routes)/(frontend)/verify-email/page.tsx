"use client";

import Button from "@/app/_components/button";
import Container from "@/app/_components/container";
import Headline from "@/app/_components/headline";
import Link from "@/app/_components/link";
import {
  checkVerification,
  resendEmailVerification,
  useAuthState
} from "@/app/_libs/firebase/auth";
import { showMsg } from "@/app/_utils/showMsg";
import { HOME_PATH, PRODUCTS_PATH } from "@/routes";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [user, loading] = useAuthState();
  const router = useRouter();

  const handleCheckVerification = async () => {
    if (user) {
      try {
        const response = await checkVerification(user);

        if (response?.successs) {
          router.push(HOME_PATH);
          showMsg(response.message, "success");
        }
      } catch (error) {
        if (error instanceof Error) {
          showMsg(error.message, "error");
        }
      }

    }
  };

  const handleResendEmailVerification = async () => {
    if (user) {
      try {
        const response = await resendEmailVerification(user);
        if (response?.successs) {
          showMsg(response.message, "success");
        }
      } catch (error) {
        if (error instanceof Error) {
          showMsg(error.message, "error");
        }
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
            <Button onClick={handleCheckVerification}>Ya lo he verificado</Button>
            <Button onClick={handleResendEmailVerification}>Reenviarme el enlace</Button>
          </div>
        </>
      ) : (
        <>
          <Headline>Usuario verificado</Headline>
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