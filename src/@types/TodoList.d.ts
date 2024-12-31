export interface TodoList {
  id: string;
  title: string;
  subtitle: string;
  scope: "work" | "study" | "personal" | "household" | "social";
  task_count: number;
  tasks_done: number;
  done: boolean;
  icon: string;
  color: string;
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
  user_id: string;
}
