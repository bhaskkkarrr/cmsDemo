const fetchStudents = async ({ queryKey }) => {
  const [_key, page, limit] = queryKey;
  const res = await fetch(
    `https://68c55deca712aaca2b68938e.mockapi.io/api/cms/cmss?page=${page}&limit=${limit}`
  );
  if (!res.ok) throw new Error("Failed to fetch students");

  const data = await res.json();
  const totalCount = res.headers.get("X-Total-Count"); // 👈 total students
  return { data, totalCount: Number(totalCount) };
};
