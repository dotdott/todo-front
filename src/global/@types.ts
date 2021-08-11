export interface IUserTodos {
  id: number;
  user_id: number;
  task: string;
  description: string;
  has_completed: number;

  created_at: string;
}
