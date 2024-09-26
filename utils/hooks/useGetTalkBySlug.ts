import { useQuery } from "@tanstack/react-query";
import { getTalkBySlug } from "../actions/talks/get-talk-slug";

async function fetchTalkBySlug(slug: string) {
  try {
    const response = await getTalkBySlug(slug);
    return response;
  } catch (error) {
    return error;
  }
}

export const useGetTalkBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["get-talk-slug", slug],
    queryFn: () => fetchTalkBySlug(slug),
  });
};