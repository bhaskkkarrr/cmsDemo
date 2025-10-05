import { useState } from "react";

const MessageItem = ({ message }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const preview =
    message.body.length > 100
      ? message.body.substring(0, 100) + "..."
      : message.body;

  return (
    <li className="d-flex align-items-start mb-2 ">
      <div className="me-3">{message.user}</div>
      <div className="flex-grow-1">
        <div className="d-flex justify-content-between">
          <h6 className="fw-bold mb-1">{message.name}</h6>
          <small className="text-muted">{message.time}</small>
        </div>

        <p className="mb-1 ">
          {expanded ? message.body : preview}
          {message.body.length > 100 && (
            <span
              onClick={toggleExpanded}
              className="blueTextms-1 "
              style={{ cursor: "pointer", fontWeight: "500" }}
            >
              {expanded ? " Show less" : " Read more"}
            </span>
          )}
        </p>
      </div>
    </li>
  );
};

export default MessageItem;
