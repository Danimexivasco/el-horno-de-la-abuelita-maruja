"use client"
import Headline from "@/components/headline";
import Container from "@/components/container";
import Link from "@/components/link";
import Button from "@/components/button";
import { MoonIcon, SunIcon } from "@/app/_icons";
import { useTheme } from "@/hooks/useTheme";

export default function ComponentsPreview() {
  const { handleTheme } = useTheme();

  return (
    <Container>
      <div className="grid gap-8">
        <section>
          <Headline as="h1" className="underline">HEADLINES</Headline>
          <Headline as="h1">{"Hi, I'm a Headline H1"}</Headline>
          <Headline as="h2">{"Hi, I'm a Headline H2"}</Headline>
          <Headline as="h3">{"Hi, I'm a Headline H3"}</Headline>
          <Headline as="h4">{"Hi, I'm a Headline H4"}</Headline>
          <Headline as="h5">{"Hi, I'm a Headline H5"}</Headline>
          <Headline as="h6">{"Hi, I'm a Headline H6"}</Headline>
        </section>
        <section>
          <Headline as="h1" className="underline"> REGULAR TEXT</Headline>
          <p className="text-base">Text base</p>
          <p className="text-base italic">Text italic</p>
          <p className="text-base font-bold">Text bold</p>
        </section>
        <section>
          <div className="grid gap-8">
            <Headline as="h1" className="underline"> UI COMPONENTS</Headline>
            <Headline as="h2">LINKS</Headline>
            <div className="flex flex-wrap gap-8 items-center">
              <Link
                href="Home"
              >
                  Go to Home Link
              </Link>
              <Link
                href="https://dcano.dev"
                external
              >
                  Go to dcano.dev
              </Link>
              <Link
                href="Home"
                asButton
              >
                  Go to Home Link Button
              </Link>
              <Link
                href="https://dcano.dev"
                external
                asButton
              >
                  Go to dcano.dev as button
              </Link>
            </div>
            <Headline as="h2">BUTTONS</Headline>
            <div className="flex flex-wrap gap-8 items-center">
              <Button>
                  Im a Button
              </Button>
              <Button className="flex items-center gap-3" onClick={() => handleTheme("dark")}>
                <MoonIcon /> Beautiful Moon
              </Button>
              <Button className="flex items-center gap-3" onClick={() => handleTheme("light")}>
                <SunIcon /> Beautiful Sun
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Container>
  )
}