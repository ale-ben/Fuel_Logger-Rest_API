"use server";

import { revalidatePath } from "next/cache";

//TODO: This is a temporary solution to revalidate the cache. It should be replaced with a more elegant solution (like revalidateTag).
export async function RevalidatePath(path: string) {
	revalidatePath(path);
}