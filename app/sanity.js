import { createClient } from "@sanity/client";
import { fetchQuery } from "./utils/supports";

const client = createClient({
  projectId: "vwgltfe2",
  dataset: "production",
  apiVersion: "2023-07-04",
  useCdn: true,
});

export const fetchFeeds = async () => {
  let data = await client.fetch(fetchQuery).then((feeds) => {
    return feeds;
  });
  return data;
};
