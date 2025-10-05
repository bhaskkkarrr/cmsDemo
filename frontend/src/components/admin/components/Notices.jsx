import { useState } from "react";

export default function NoticeItem({ notice }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const preview =
    notice.content.length > 100
      ? notice.content.substring(0, 100) + "..."
      : notice.content;

  return (
    <li className="list-group-item bg-light">
      <div className="fw-bold d-flex justify-between pb-2">
        {notice.title}

        {/* Date Badge */}
        <div className="badge badge-success d-flex bg-greenish justify-content-center align-items-center">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
              <polyline
                points="7 13 10 16 17 8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></polyline>
            </g>
          </svg>
          {notice.date}
        </div>
      </div>
      <p className="mb-1">
        {expanded ? notice.content : preview}
        {notice.content.length > 100 && (
          <span
            onClick={toggleExpanded}
            className="blueTextms-1"
            style={{ cursor: "pointer", fontWeight: "500" }}
          >
            {expanded ? " Show less" : " Read more"}
          </span>
        )}
      </p>
    </li>
  );
}
