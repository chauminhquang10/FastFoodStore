import React, { useContext, useEffect, useState, useRef } from "react";
import "./Messenger.css";

import { GlobalState } from "../../GlobalState";

import Conversation from "./Conversations/Conversation";
import Message from "./Message/Message";

import ChatOnline from "./ChatOnline/ChatOnline";

import { io } from "socket.io-client";

import axios from "axios";

const Messenger = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  // khi logged mới hiện chat box (nhớ thêm vào sau)
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  const [user] = state.userAPI.user;

  // các cuộc conversation hiển thị trên front end (dc lấy từ database r nạp vào đây)
  const [conversations, setConversations] = useState([]);

  const [currentConversation, setCurrentConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [newMessage, setNewMessage] = useState("");

  //tìm avatar của người dùng còn lại trong đoạn hội thoại
  const [senderUser, setSenderUser] = useState([]);

  const [anotherUserID, setAnotherUserID] = useState("");

  // tin nhắn nhận từ socket bên backend server
  const [arrivalMessage, setArrivalMessage] = useState(null);

  //danh sách người dùng online
  const [onlineUsers, setOnlineUsers] = useState([]);

  const scrollRef = useRef();

  //socket io dùng cho nhắn tin real time
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentConversation]);

  useEffect(() => {
    if (user._id) {
      socket.current.emit("addUser", user._id);
    }
    socket.current.on("getUsers", (usersList) => {
      let userIds = [];
      usersList.map((u) => {
        const temp = u.userId;
        userIds.push(temp);
      });

      setOnlineUsers(userIds);
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      if (!isAdmin) {
        const res = await axios.get(`/api/findConversation/${user._id}`, {
          headers: { Authorization: token },
        });
        setConversations(res.data);
      } else {
        const res = await axios.get("/api/allConversation", {
          headers: { Authorization: token },
        });
        setConversations(res.data);
      }
    };
    getConversations();
  }, [isAdmin, user._id]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await axios.get(
        `/api/findMessages/${currentConversation._id}`,
        {
          headers: { Authorization: token },
        }
      );
      setMessages(res.data);
    };
    if (currentConversation !== null) {
      getMessages();
    }
  }, [currentConversation]);

  useEffect(() => {
    const getUserById = async () => {
      if (currentConversation) {
        setAnotherUserID(
          currentConversation.members.find((member) => member !== user._id)
        );
      }
      try {
        if (anotherUserID) {
          const res = await axios.get(`/user/findUser/${anotherUserID}`, {
            headers: { Authorization: token },
          });
          setSenderUser(res.data);
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    getUserById();
  }, [user, anotherUserID, currentConversation]);

  const handleSubmitMessage = async (event) => {
    event.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationID: currentConversation._id,
    };

    const receiverId = currentConversation.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/newMessage", message, {
        headers: { Authorization: token },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations ? (
              <>
                {conversations.map((conversation) => (
                  <div onClick={() => setCurrentConversation(conversation)}>
                    <Conversation
                      conversation={conversation}
                      currentUser={user}
                    ></Conversation>
                  </div>
                ))}
              </>
            ) : (
              <span>No Contact</span>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentConversation ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                        currentUser={user}
                        senderUser={senderUser}
                      ></Message>
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    onChange={(event) => setNewMessage(event.target.value)}
                    value={newMessage}
                    placeholder="Write something..."
                    className="chatMessageInput"
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmitMessage}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Please open a conversation to start a chat !
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user._id}
              setCurrentConversation={setCurrentConversation}
            ></ChatOnline>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
