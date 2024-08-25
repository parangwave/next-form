export interface UserProps {
  id: number;
  username: string;
  password: string | null;
  email: string | null;
  phone: string | null;
  bio: string | null;
  avatar: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface TweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  updated_at?: Date;
  user: {
    username: string;
    avatar: string | null;
  };
  _count: {
    likes: number;
    responses: number;
  };
}

export interface LikeProps {
  user: {
    id: number;
    username: string;
    avatar?: string;
  };
  tweet: {
    id: number;
    created_at: Date;
    updated_at: Date;
  };
  created_at: Date;
  updated_at: Date;
}

export interface ResponseProps {
  user: {
    id: number;
    username: string;
    avatar: string | null;
  };
  tweet: {
    userId: number;
    id: number;
  };
  id: number;
  created_at: Date;
  updated_at: Date;
}
