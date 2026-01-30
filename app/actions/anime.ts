"use server";

import { api } from "@/services/api";

export async function resolveStreamAction(href: string) {
  return await api.resolveWebStream(href);
}
