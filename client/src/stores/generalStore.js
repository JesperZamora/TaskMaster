import { readable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8080");
export const TASK_URL = readable("http://localhost:8080/api/v1/tasks");
export const TAG_URL = readable("http://localhost:8080/api/v1/tags");
export const AUTH_URL = readable("http://localhost:8080/api/v1");
