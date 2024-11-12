import Container from "@/app/_components/container";
import Spinner from "@/app/_components/spinner";

export default function Loading() {
  return (
    <Container className="grid w-full place-items-center h-full overflow-hidden">
      <Spinner />
    </Container>
  )
}