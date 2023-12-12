import Loader from "@/components/common/Loader";
import { primaryColor } from "@/constants/colors";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import { MessageCircle, Share2, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Feed = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <section
        className={`mt-4 bg-[${primaryColor}] md:w-3/5 w-full p-4 rounded-xl bg-opacity-5`}
      >
        <div className="flex items-center justify-center">
          <div className="grid md:grid-cols-1 md:w-[50vw]">
            <div className="flex gap-4 items-center">
              <Avatar>
                <AvatarImage src="/Image1.jpg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center ">
                <p>Pasindu Dulanjaya</p>
                <h4 className="text-xs"> 2023/11/25</h4>
              </div>
            </div>

            <div>
              <Separator className="my-4 bg-white " />
            </div>
            <div className="relative md:h-[40vh]  h-[25vh]">
              <Image
                fill
                src="/Image1.jpg"
                alt=""
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
            <p className="mt-4">
              Enjoying a beautiful day outdoors with friends. 😊🌞 #FunTimes
              Enjoying a beautiful day outdoors with friends. 😊🌞
              #FunTimesEnjoying a beautiful day outdoors with friends. 😊🌞
              #FunTimes
            </p>
            <div>
              <Separator className="my-4 bg-white " />
            </div>
            <div className="flex items-center justify-between gap-8 md:px-32">
              <div className="flex gap-2 items-center justify-center">
                <ThumbsUp className={`hover:text-[${primaryColor}]`} />
                <h1>Like</h1>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <MessageCircle className={`hover:text-[${primaryColor}]`} />
                <h1>Comment</h1>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Share2 className={`hover:text-[${primaryColor}]`} />
                <h1>Share</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Feed;
