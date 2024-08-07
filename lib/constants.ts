import { z } from "zod";

// email
export const EMAIL_REGEX = new RegExp(/@zod\.com$/);
export const EMAIL_REGEX_ERROR = "Only @zod.com emails are allowed";

// username
export const USERNAME_MIN_LENGTH = 5;
export const USERNAME_MIN_ERROR =
  "Username should be at least 5 characters long";

// password
export const PASSWORD_MIN_LENGTH = 10;
export const PASSWORD_MIN_ERROR =
  "Password should be at least 10 characters long";

export const PASSWORD_REGEX = new RegExp(/\d/);
export const PASSWORD_REGEX_ERROR =
  "Password should contain at least one number (0123456789)";
