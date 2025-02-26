"use client";
import Headline from "@/components/headline";
import Container from "@/components/container";
import Link from "@/components/link";
import Button from "@/components/button";
import { MoonIcon, SunIcon } from "@/icons/index";
import { useTheme } from "@/hooks/useTheme";
import Input from "@/components/input";

export default function ComponentsPreview() {
  const { setTheme } = useTheme();

  return (
    <Container>
      <div className="grid gap-8">
        <section>
          <Headline
            as="h1"
            className="underline"
          >HEADLINES
          </Headline>
          <Headline as="h1">{"Hi, I'm a Headline H1"}</Headline>
          <Headline as="h2">{"Hi, I'm a Headline H2"}</Headline>
          <Headline as="h3">{"Hi, I'm a Headline H3"}</Headline>
          <Headline as="h4">{"Hi, I'm a Headline H4"}</Headline>
          <Headline as="h5">{"Hi, I'm a Headline H5"}</Headline>
          <Headline as="h6">{"Hi, I'm a Headline H6"}</Headline>
        </section>
        <section>
          <Headline
            as="h1"
            className="underline"
          >REGULAR TEXT
          </Headline>
          <p className="text-base">Text base</p>
          <p className="text-base italic">Text italic</p>
          <p className="text-base font-bold">Text bold</p>
        </section>
        <section>
          <div className="grid ">
            <Headline
              as="h1"
              className="underline"
            >UI COMPONENTS
            </Headline>
            <Headline
              as="h3"
              className="mt-4"
            >LINKS
            </Headline>
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
            <Headline
              as="h3"
              className="mt-4"
            >BUTTONS
            </Headline>
            <div className="flex flex-wrap gap-8 items-center">
              <Button>
                Im a Button
              </Button>
              <Button
                className="flex items-center gap-3"
                onClick={() => setTheme("dark")}
              >
                <MoonIcon /> Beautiful Moon
              </Button>
              <Button
                className="flex items-center gap-3"
                onClick={() => setTheme("light")}
              >
                <SunIcon /> Beautiful Sun
              </Button>
            </div>
          </div>
        </section>
        <section>
          <Headline
            as="h1"
            className="underline"
          >INPUTS
          </Headline>
          <div className="flex flex-wrap gap-8">
            <Input
              type="text"
              name="textInput"
              label="Text Input"
              placeholder="Text Input"
              onChange={() => null}
            />
            <Input
              type="email"
              name="emailInput"
              label="Email Input"
              placeholder="Email Input"
              onChange={() => null}
            />
            <Input
              type="password"
              name="passwordInput"
              label="Password Input"
              placeholder="Password Input"
              onChange={() => null}
            />
            <Input
              type="number"
              name="numberInput"
              label="Number Input"
              placeholder="Number Input"
              onChange={() => null}
            />
          </div>
        </section>
      </div>
    </Container>
  );
}