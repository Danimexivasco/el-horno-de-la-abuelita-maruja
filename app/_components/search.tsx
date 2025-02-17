"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Input from "./input";
import { CrossIcon, LensIcon } from "../_icons";
import { useSessionStorage } from "usehooks-ts";

export default function Search() {
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const [firstURLCheck, setFirstURLCheck] = useState(false);
  const [currentParams, setCurrentParams] = useState(new URLSearchParams(searchParams.toString()));
  // eslint-disable-next-line
  const [_activeSearchStorage, setActiveSearchStorage, removeActiveFiltersStorage] = useSessionStorage("active-search", "");

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

    if (currentParams.size > 0) {
      window.history.pushState(null, "", `?${currentParams.toString()}`);
    }
  }, [query, searchParams]);

  useEffect(() => {
    const searchQuery = searchParams.get("search") ?? "";
    setQuery(searchQuery);
    if (searchQuery) {
      setActiveSearchStorage(searchQuery);
    }
  }, [searchParams]);

  const keydownHandler = (e: KeyboardEvent) => {
    if(e.key === "f" && e.ctrlKey) {
      e.preventDefault();
      searchRef.current?.focus();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    return () => {
      document.removeEventListener("keydown", keydownHandler);
    };
  }, []);

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const clearQuery = () => {
    setQuery("");
    removeActiveFiltersStorage();
    currentParams.delete("search");
    window.history.pushState(null, "", `?${currentParams.toString()}`);
  };

  return (
    <section className="grid place-items-end justify-items-center min-h-[15dvh] dark:bg-cake-950 bg-cake-200/70 p-8">
      <div
        className="w-full lg:w-2/4 lg:max-w-2xl flex justify-center items-center bg-white rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-cake-600 shadow-md"
      >
        <LensIcon className="w-6 h-6 dark:text-cake-400 text-cake-600"/>
        <Input
          type="text"
          name="search"
          value={query}
          placeholder="Busca entre nuestros productos..."
          onChange={handleQuery}
          autoComplete="off"
          className="flex-1 focus:ring-0 !appearance-none peer"
          ref={searchRef}
        />
        {query ?
          <CrossIcon
            className="w-6 h-6 dark:text-cake-400 text-cake-600"
            role="button"
            onClick={clearQuery}
          />
          :
          <span className="hidden lg:block text-gray-400/90 border-2 border-gray-400/20 px-2 py-1 rounded-lg peer-focus:hidden shadow-sm">Ctrl + F</span>
        }
      </div>
    </section>
  );
}