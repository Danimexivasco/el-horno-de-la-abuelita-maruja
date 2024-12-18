import FullLogo from "@/components/fullLogo";
import Container from "@/components/container";
import AuthenticationCard from "@/components/authenticationCard";
import { AuthenticationPages } from "@/types";

type AuthPageContentProps = {
  type: AuthenticationPages
};

export default function AuthPageContent({ type }: AuthPageContentProps) {
  return (
    <Container className="flex flex-col max-w-6xl items-center gap-8 sm:gap-12">
      <FullLogo className="w-[30vh] sm:w-96"/>
      <AuthenticationCard type={type}/>
    </Container>
  );
}