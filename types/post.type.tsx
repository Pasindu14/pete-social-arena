type Post = {
  postId: string;
  postDate: Date;
  postImage: string;
  author: string;
  status: string;
  profile_picture_url: string;
  full_name: string;
  is_liked_by_current_user: boolean;
  post_likes_count: number;
  post_comments_count: number;
};
