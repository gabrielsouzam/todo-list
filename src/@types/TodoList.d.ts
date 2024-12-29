export interface TodoList {
  id: string;
  title: string;
  subtitle: string;
  scope: string;
  task_count: number;
  tasks_done: number;
  done: boolean;
  icon: string;
  color: string;
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
}
