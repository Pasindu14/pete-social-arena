"use client";
import React, { useState } from "react";
import { mainSidebarItems } from "@/constants/sidebar-contents";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const MainSidebar = () => {
  const router = useRouter();
  const { user } = useUser();
  const [selectedIndex, setSelectedIndex] = useState(1);

  const sideBarOnClick = async (id: number) => {
    setSelectedIndex(id);
    if (id === 1) {
      router.push("/dashboard");
    } else if (id === 2) {
      router.push(`/profile/${user?.id}`);
    } else if (id === 3) {
      router.push(`/notifications`);
    }
  };

  return (
    <div className="w-full">
      {mainSidebarItems.map((filter) => {
        return (
          <Button
            className={`p-2 rounded-sm mb-2 pl-2  ${
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
  );
};

export default MainSidebar;
