"use client";

import { validateSearchKeyword } from "@/app/(home)/(tabs)/search/actions";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import Input from "./Input";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

interface SearchInputProps {
  onSearch: (searchValue: string) => void;
}

function SearchInputForm({ onSearch }: SearchInputProps) {
  const [state, dispatch] = useFormState(validateSearchKeyword, null);
  const [searchValue, setSearchValue] = useState("");
  const params = useParams();

  useEffect(() => {
    setSearchValue("");
    onSearch(searchValue);
  }, [params, onSearch]);

  return (
    <>
      <form action={dispatch} className="flex w-full">
        <Input
          type="text"
          name="search"
          placeholder="트윗을 검색해보세요."
          value={searchValue}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          className="w-full"
          icon={<MagnifyingGlassIcon className="absolute left-3 size-5" />}
        />
        <Button text={"검색"}></Button>
      </form>

      {state?.fieldErrors.search && (
        <p className="text-red-500 text-xs">* {state?.fieldErrors.search}</p>
      )}
    </>
  );
}

export default function SearchInput() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    if (search.trim() === "") {
      return;
    }

    // 검색어가 입력 후 페이지이동
    router.push(`/search/result?search=${encodeURIComponent(search)}`);
  }, [search, router]);

  return (
    <>
      <SearchInputForm onSearch={setSearch} />
    </>
  );
}
