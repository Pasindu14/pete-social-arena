import React from "react";
import PeopleResultItem from "./people-result-item";
import { PostItem } from "../../dashboard/_component/post-item";
import Image from "next/image";

const SearchResult = ({ id, datas }: { id: number; datas: any }) => {
  if (datas.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-full min-h-[50vh]">
        <Image
          src="/no_data.svg"
          alt="Logo"
          style={{
            width: "50%",
            height: "auto",
          }}
          width={500}
          height={300}
          className="p-20"
        />
      </div>
    );
  }

  return (
    <div>
      {id === 1 && (
        <div>
          {datas.map((data: any) => {
            return <PeopleResultItem person={data} key={data.id} />;
          })}
        </div>
      )}
      {id === 2 && (
        <div>
          {datas.map((post: any) => {
            return (
              <div key={post.post_id}>
                <PostItem
                  postId={post.post_id}
                  postDate={post.post_created_at}
                  postImage={post.post_image_url}
                  author={post.author_id}
                  status={post.post_status}
                  profile_picture_url={post.author_profile_picture_url}
                  full_name={post.author_full_name}
                  is_liked_by_current_user={post.is_liked_by_user}
                  post_comments_count={post.post_comments_count}
                  post_likes_count={post.post_likes_count}
                  key={post.post_id}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchResult;
