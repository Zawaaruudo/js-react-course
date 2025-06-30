import RobotImage from '../assets/robot.png';
import UserImage from '../assets/user.png'
import './ChatMessage.css';
import dayjs from "dayjs";
export function ChatMessage({ message, sender, time }) {
  return (
    <div className={
      sender === 'user' ?
        'chat-message-user' :
        'chat-message-robot'
    }>
      {sender === 'robot' && (
        <img className="profile" src={RobotImage} />
      )}
      <div className="chat-message-text">
        {message}
        {/* The "time && (" check is optional. I added it just to be safe. */}
        {time && (
          <div className="chat-message-time">
            {dayjs(time).format('h:mma')}
          </div>
        )}
      </div>
      {sender === 'user' && (
        <img className="profile" src={UserImage} />
      )}
    </div>
  );
}