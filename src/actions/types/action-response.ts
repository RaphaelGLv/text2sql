export interface BaseActionResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
}