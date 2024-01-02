import { MymoidApiError } from "./types";

export class ApiError extends Error {
  public code: string;
  public message: string;
  public status: number;
  public origin: string;
  public details: { message: string }[];

  constructor(error: MymoidApiError) {
    super(error.message);
    this.code = error.code;
    this.message = error.message;
    this.status = error.status;
    this.origin = error.origin;
    this.details = error.details;
  }
}
