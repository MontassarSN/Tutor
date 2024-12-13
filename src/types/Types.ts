// src/types.ts

import { Database, Tables } from "./database.types";

export interface Category {
    text: string;
    pic: string;
    courses: string;
    color: string;
  }

  export interface ICart extends Tables<"cart"> {
    courses: Tables<"courses">;
  }
  
  
  export type tableType = keyof Database[Extract<
    keyof Database,
    "public"
  >]["Tables"];

