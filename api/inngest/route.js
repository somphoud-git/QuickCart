import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletetion, syncUserUpation } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpation,
    syncUserDeletetion
  ],
});
