"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "./input";
import { CrossIcon, LensIcon } from "../_icons";

export default function Search() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const [firstURLCheck, setFirstURLCheck] = useState(false);
  const [currentParams, setCurrentParams] = useState(new URLSearchParams(searchParams.toString()));

  useEffect(() => {
    setCurrentParams(new URLSearchParams(searchParams.toString()));
  }, [searchParams]);

  useEffect(() => {
    const currentParams = new URLSearchParams(searchParams.toString());

    if (query) {
      currentParams.set("search", query);
    } else {
      if (!firstURLCheck) {
        setFirstURLCheck(true);
      } else {
        currentParams.delete("search");
      }
    }

    router.replace(`?${currentParams.toString()}`);
  }, [query, searchParams]);

  useEffect(() => {
    setQuery(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    currentParams.delete("search");
    router.replace(`?${currentParams.toString()}`);
  };

  return (
    <section className="grid place-items-end justify-items-center min-h-[15vh] dark:bg-cake-950 bg-cake-200/70 p-8">
      <div
        className="w-full lg:w-2/4 flex justify-center items-center bg-white rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-cake-600 focus-within:shadow-md"
      >
        <LensIcon className="w-6 h-6 dark:text-cake-400 text-cake-600"/>
        <Input
          type="text"
          name="search"
          value={query}
          placeholder="Busca entre nuestros productos..."
          onChange={handleQuery}
          autoComplete="off"
          className="flex-1 focus:ring-0 !appearance-none"
        />
        {query ?
          <CrossIcon
            className="w-6 h-6 dark:text-cake-400 text-cake-600"
            role="button"
            onClick={clearQuery}
          />
          :
          null
        }
      </div>
    </section>
  );
}