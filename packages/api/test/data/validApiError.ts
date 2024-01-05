import { MymoidApiError } from "../../src/types";

export function buildValidApiError(): MymoidApiError {
  return {
    code: "400",
    message: "Bad Request",
    status: 400,
    origin: "API",
    details: [
      {
        message: "Invalid request",
      },
    ],
  };
}
