import FullLogo from "@/components/fullLogo";
import Container from "@/components/container";
import AuthenticationCard from "@/components/authenticationCard";
import { AuthenticationPages } from "@/types";

type AuthPageContentProps = {
  type: AuthenticationPages
};

export default function AuthPageContent({ type }: AuthPageContentProps) {
  return (
    <Container className="flex flex-col max-w-6xl md:flex-row items-center gap-12 md:gap-20 xl:gap-32">
      <FullLogo className="w-72 md:w-1/2"/>
      <AuthenticationCard type={type}/>
    </Container>
  );
}