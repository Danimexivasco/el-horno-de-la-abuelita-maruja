import Container from "@/app/_components/container";
import Spinner from "@/app/_components/spinner";

export default function Loading() {
  return (
    <Container className="grid w-full place-items-center h-full min-h-screen overflow-hidden p-0">
      <Spinner className="w-16 h-16"/>
    </Container>
  );
}