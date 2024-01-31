import { fetchPostsByStatus } from "@/lib/server-actions/post-actions";
import { fetchUsersByName } from "@/lib/server-actions/user-actions";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export const useSearch = (param: string) => {
  const { user } = useUser();

  const filterPeopleSearch = async (search: string) => {
    const result = fetchUsersByName(search);
    return result;
  };

  const filterPostsSearch = async (search: string) => {
    const result = fetchPostsByStatus(search, user?.id!);
    return result;
  };

  return {
    filterPostsSearch,
    filterPeopleSearch,
  };
};
