import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { query, where, addDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from '../../config/firebase';
  export const ChatContext = createContext();
  
    const INITIAL_STATE = {
      chatroomId: null,
      user: null
    };
  
    const chatReducer = (state, action) => {
        switch (action.type) {
          case "SET_CHATROOM_ID":
            return {
              ...state,
              chatroomId: action.payload,
            };
          case "SET_USER":
            return {
              ...state,
              user: action.payload,
            };
          default:
            return state;
        }
      };

export const ChatContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          dispatch({ type: "SET_USER", payload: user });
        } else {
          dispatch({ type: "SET_USER", payload: null });
        }
      });
  
      return unsubscribe;
    }, []);

    const checkChatroom = async (currentUseruid, otherUserId) => {

        const chatroomRef = doc(db, 'ChatRoom');
        const q = query(chatroomRef, where('Users', 'array-contains', currentUseruid));
        const querySnapshot = await getDocs(q);
        
        let foundChatroom = null;
        querySnapshot.forEach((doc) => {
        const chatroom = doc.data();
        if (chatroom.Users.includes(otherUserId)){
            foundChatroom = doc.id;
        }
        });

        if (foundChatroom){
            return foundChatroom;
        } else {
          const newChatroomRef = doc(db, 'ChatRoom').doc();
    
          await addDoc(newChatroomRef, {
            Users: [currentUseruid, otherUserId],
            createdAt: new Date(),
          });
          return newChatroomRef.id;
          }
        };

  
    return (
        <ChatContext.Provider value={{ state, dispatch, checkChatroom }}>
          {children}
        </ChatContext.Provider>
      );
    };