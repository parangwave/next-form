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
  payload: string;
}
