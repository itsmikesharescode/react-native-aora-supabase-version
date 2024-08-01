export type VideoType = {
  id: number;
  created_at: string;
  user_id: string;
  title: string;
  thumbnail: string;
  prompt: string;
  video: string;
};

export type BookmarkType = {
  id: number;
  created_at: string;
  user_id: string;
  video_id: number;
};

export interface AuthLoadType {
  allvideos: VideoType[];
  personal_videos: VideoType[];
  bookmarks: VideoType[];
}
