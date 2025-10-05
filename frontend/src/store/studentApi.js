import { useQuery } from "@tanstack/react-query";

const fetchAllStudents = async () => {
  const res = await fetch(
    `https://68c55deca712aaca2b68938e.mockapi.io/api/cms/cmss`
  );
  if (!res.ok) throw new Error("Failed to fetch students");

  return res.json(); 
};

export function useStudents() {
  return useQuery({
    queryKey: ["students"],
    queryFn: fetchAllStudents,
    staleTime: 1000 * 60, 
  });
}
