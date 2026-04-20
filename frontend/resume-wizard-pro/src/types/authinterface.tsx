export type User = {
  id: string;
  name: string;
  email: string;
  profilepic:string
  plan:string
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};