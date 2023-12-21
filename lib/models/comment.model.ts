export interface Comment {
    id: string;
    user_id: string;
    post_id: string;
    parent_comment_id: string | null;
    comment: string;
    created_at: string;
}
