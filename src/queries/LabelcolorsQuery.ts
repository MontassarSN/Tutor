import { fetchLabelColors } from "@/api/labelcolors";

export const LabelcolorsQuery = {
  queryKey: ["LabelColors"],
  queryFn: async () => await fetchLabelColors(),
};
