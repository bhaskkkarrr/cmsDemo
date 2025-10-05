import { useQuery } from "@tanstack/react-query";

const fetchAllTeachers = async () => {
  const res = await fetch(
    `https://68c55deca712aaca2b68938e.mockapi.io/api/cms/teachers`
  );
  if (!res.ok) throw new Error("Failed to fetch teachers");
  return res.json();
};

export function useTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: fetchAllTeachers,
    staleTime: 1000 * 60,
  });
}
