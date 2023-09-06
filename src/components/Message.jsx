import React from 'react';
import { auth } from '../firebase';

const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full text-left`,
  writer: `text-black-600 text-xs`,
  link: `text-white-600 hover:text-blue-800 underline-none cursor-pointer`,
  deleteButton: `text-red-500 ml-2 cursor-pointer`,
  reportButton: `text-yellow-500 ml-2 cursor-pointer`,
};

const Message = ({ message, onDelete, onBan, onNoBan  }) => {
  const messageClass =`${style.received}`;

  // Check if the message has a URL
  const hasURL =
    message.hasOwnProperty('url') &&
    (message.url.startsWith('http://') || message.url.startsWith('https://'));

    return (
      <div>
        <div className={`${style.message} ${messageClass}`} style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-all', maxWidth: '45ch', }} >
          {hasURL ? (
            <div className={style.writer}>
              <div className={style.profileImage}>
                <img src={message.photoUrl } alt = "Profile" title={message.name} className="rounded-full w-8 h-8 mr-2" />
              </div>
              <a href={message.url} target="_blank" rel="noopener noreferrer" className={style.link}>
                {message.text}
              </a>
            </div>
          ) : (
            <div className={style.writer}>
              <div className={style.profileImage}>
                <img src={message.photoUrl } alt = "Profile" title={message.name} className="rounded-full w-8 h-8 mr-2" />
              </div>
              <p>{message.text}</p>
            </div>
          )}
          <>
            <span onClick={() => onBan(message.name, message.id)} className={style.reportButton}>
              🏴
            </span>
            <span onClick={() => onNoBan(message.name, message.id, message.reported)} className={style.reportButton}>
              🏳️
            </span>
            <span onClick={() => onDelete(message.id)} className={style.deleteButton}>
              🗑️
            </span>
          </>
        </div>
      </div>
    );
};

export default Message;

/*
import React from 'react';
import { auth } from '../firebase';

const style = {
  message: `flex items-center shadow-xl m-4 py-2 px-3 rounded-tl-full rounded-tr-full`,
  name: `absolute mt-[-4rem] text-gray-600 text-xs`,
  sent: `bg-[#395dff] text-white flex-row-reverse text-end float-right rounded-bl-full`,
  received: `bg-[#e5e5ea] text-black float-left rounded-br-full text-left`,
  writer: `text-black-600 text-xs`,
  link: `text-white-600 hover:text-blue-800 underline-none cursor-pointer`,
  deleteButton: `text-red-500 ml-2 cursor-pointer`,
  reportButton: `text-yellow-500 ml-2 cursor-pointer`,
};

const Message = ({ message, onDelete, onReport, onNoBan  }) => {
  const messageClass =`${style.received}`;

  // Check if the message has a URL
  const hasURL =
    message.hasOwnProperty('url') &&
    (message.url.startsWith('http://') || message.url.startsWith('https://'));

  return (
    <div>
      <div
        className={`${style.message} ${messageClass}`}
        style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', wordBreak: 'break-all', maxWidth: '45ch' }}
      >
        {hasURL ? (
          <div className={style.writer}>
            <p>{message.name}</p>
            <a href={message.url} target="_blank" rel="noopener noreferrer" className={style.link}>
              {message.text}
            </a>
          </div>
        ) : (
          <p className={style.writer}>
            {message.name} <br />
            {message.text}
          </p>
        )}

        
          <>
          <span onClick={() => onNoBan(message.name)} className={style.reportButton}>
            🏳️
          </span>
          <span onClick={() => onReport(message.name)} className={style.reportButton}>
            🏴
          </span>
          <span onClick={() => onDelete(message.id)} className={style.deleteButton}>
            🗑️
          </span>
          </>
        

      </div>
    </div>
  );
};

export default Message;
*/