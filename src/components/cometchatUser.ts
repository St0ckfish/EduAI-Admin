import { CometChat } from "@cometchat-pro/chat";

// لإنشاء مستخدم جديد
export const createUser = async (uid: string, name: string): Promise<void> => {
  const user = new CometChat.User(uid);
  user.setName(name);

  try {
    await CometChat.createUser(user, process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY!);
    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

// لتسجيل دخول المستخدم
export const loginUser = async (uid: string): Promise<void> => {
  try {
    const user = await CometChat.login(uid, process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY!);
    console.log("Login successful:", user);
  } catch (error) {
    console.error("Login failed with error:", error);
  }
};

// إرسال رسالة
export const sendMessage = async (receiverID: string, messageText: string, receiverType = CometChat.RECEIVER_TYPE.USER): Promise<void> => {
  const textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

  try {
    const message = await CometChat.sendMessage(textMessage);
    console.log("Message sent successfully:", message);
  } catch (error) {
    console.error("Message sending failed:", error);
  }
};

// إضافة مستمع الرسائل
export const addMessageListener = (listenerID: string, callback: (message: CometChat.TextMessage) => void): void => {
  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: (message: CometChat.TextMessage) => {
        console.log("Message received:", message);
        callback(message);
      },
    })
  );
};
