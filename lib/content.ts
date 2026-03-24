import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

// Server-only reader — import only in Server Components or page.tsx files
export const reader = createReader(process.cwd(), keystaticConfig);
