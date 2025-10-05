const SkeletonRow = () => {
  return (
    <tr className="animate-pulse">
      <td>
        <div className="h-10 w-4 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-10 w-32 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-10 w-24 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-10 w-20 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-10 w-28 bg-gray-300 rounded"></div>
      </td>
      <td>
        <div className="h-10 w-40 bg-gray-300 rounded"></div>
      </td>
    </tr>
  );
};

export default SkeletonRow;
