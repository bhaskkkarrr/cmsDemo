import { FaUser } from "react-icons/fa";
import MessageItem from "./Messages";
import { BiSolidMessageDetail } from "react-icons/bi";

const Messages = () => {
  const messages = [
    {
      user: <FaUser size={28} className="text-secondary" />,
      name: "Ms. Sunita Williams",
      body: "Hello, this is a demo message. This text is long enough to demonstrate read more / show less functionality. The message should expand fully when clicked.",
      time: "9:00 AM",
    },
    {
      user: <FaUser size={28} className="text-secondary" />,
      name: "Mr. John Smith",
      body: "Another short demo message here.",
      time: "10:15 AM",
    },
    {
      user: <FaUser size={28} className="text-secondary" />,
      name: "Ms. Sunita Williams",
      body: "Hello, this is a demo message.",
      time: "12:45 PM",
    },
  ];

  return (
    <div className="px-3 py-2 shadow rounded-4 bg-light mx-3">
      <div className="d-flex align-items-center fw-bold blueTextmy-2">
        <BiSolidMessageDetail className="fs-1 blueTextme-3" />
        <span>Messages</span>
      </div>
      <ul className="list-group list-group-flush ">
        {messages.map((msg, idx) => (
          <MessageItem key={idx} message={msg} />
        ))}
      </ul>
    </div>
  );
};

export default Messages;
