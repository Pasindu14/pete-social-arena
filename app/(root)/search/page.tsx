"use client";
import { LoaderFull } from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import PeopleResultItem from "@/components/ui/search/people-result-item";
import SearchResult from "@/components/ui/search/search-content";
import { Separator } from "@/components/ui/separator";
import { primaryColor } from "@/constants/colors";
import { searchSidebarItems } from "@/constants/search-sidebar";
import { useSearch } from "@/hooks/useSearch";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Search = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("p");
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [data, setData] = useState<any[]>([]);

  const { filterPeopleSearch, filterPostsSearch } = useSearch(search || "");

  useEffect(() => {
    sideBarOnClick(selectedIndex);
  }, [search]);

  const sideBarOnClick = async (id: number) => {
    setLoading(true);
    setSelectedIndex(id);

    if (id === 1) {
      const result = await filterPeopleSearch();
      console.log(result);
      setData(result);
    } else if (id === 2) {
      const result = await filterPostsSearch();
      setData(result);
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="w-full">
        <div className="flex items-start justify-center gap-2">
          {/* SideBar */}
          <div className="basis-1/5 bg-black/20 p-4 rounded-xl flex-col h-[85vh] border-2 border-white/5">
            <h1 className="mb-2 md:text-2xl">Search results</h1>
            <Separator className="bg-white" />
            {searchSidebarItems.map((filter) => {
              return (
                <Button
                  className={`p-2 rounded-xl mb-2 pl-2 ${
                    filter.id == 1 ? "mt-6" : ""
                  } w-full`}
                  variant={selectedIndex === filter.id ? "default" : "outline"}
                  onClick={() => {
                    sideBarOnClick(filter.id);
                  }}
                  key={filter.id}
                >
                  {filter.title}
                </Button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 bg-black/20 py-2 rounded-xl border-2 border-white/5 px-4  h-[85vh] overflow-y-auto custom-scrollbar">
            {loading ? (
              <LoaderFull color={primaryColor} size={25} />
            ) : (
              <SearchResult id={selectedIndex} datas={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
