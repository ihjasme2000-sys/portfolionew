import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  inquiries: defineTable({
    name: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    service: v.string(),
    message: v.string(),
    status: v.string(),
  }).index("by_status", ["status"]),
});
