import { useState } from "react";
import styles from "./Notices.module.css";

export default function NoticeItem({ notice }) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const preview =
    notice.body.length > 100
      ? notice.body.substring(0, 100) + "..."
      : notice.body;

  return (
    <li className={`${styles.noticeItem} ${expanded ? styles.fadeIn : ""}`}>
      <div className={styles.noticeHeader}>
        <h3 className={styles.noticeTitle}>{notice.title}</h3>

        <div className={`${styles.dateBadge} h-8 rounded-pill px-3 py-2 `}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
          <span>{notice.submitted_on}</span>
        </div>
      </div>

      <p className={styles.noticeContent}>
        {expanded ? notice.body : preview}
        {notice.body.length > 100 && (
          <button onClick={toggleExpanded} className={styles.readMoreButton}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
    </li>
  );
}
