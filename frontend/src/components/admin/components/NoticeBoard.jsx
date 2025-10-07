import { IoMdNotifications, IoMdAdd } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";

import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NoticeItem from "./Notices";
import { useContext } from "react";
import { NoticeContext } from "../../../context/NoticeContext";
import styles from "./NoticeBoard.module.css";

export default function NoticeBoard() {
  const { notices, isLoading } = useContext(NoticeContext);
  const navigate = useNavigate();

  const handleOnClickEditIcon = () => {
    navigate("/admin/notice");
  };

  return (
    <div className={styles.noticeBoardContainer}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <IoMdNotifications className={styles.titleIcon} />
          <span>Notice Board</span>
        </div>

        <div className={styles.actionButtons}>
          <button
            onClick={handleOnClickEditIcon}
            className={`${styles.actionButton} ${styles.editButton}`}
            title="Edit"
          >
            <MdEditSquare size={20} />
          </button>
        </div>
      </div>

      <ul className={styles.noticeList}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.spinner} />
            <strong>Loading...</strong>
          </div>
        ) : (
          notices.map((notice) => (
            <NoticeItem key={notice._id} notice={notice} />
          ))
        )}
      </ul>
    </div>
  );
}
