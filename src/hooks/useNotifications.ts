import { useState, useEffect, useRef } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

interface NotificationsHookResult {
  notificationsCount: number;
  isConnected: boolean;
}

export const useNotificationsWebSocket = (userId: string | null): NotificationsHookResult => {
  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const stompClientRef = useRef<Client | null>(null);

  useEffect(() => {
    // Validate token and userId before connection
    const token = Cookies.get('token');
    if (!token || !userId) {
      toast.error('Authentication required for notifications');
      return;
    }

    // Create STOMP client
    const stompClient = new Client({
      brokerURL: `wss://eduai.vitaparapharma.com/ws?token=${token}`,
      debug: function (str) {
        console.log('[STOMP Notifications Debug]', str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // Connection success handler
    stompClient.onConnect = () => {
      console.log('WebSocket Notifications Connected Successfully');
      setIsConnected(true);

      // Subscribe to user-specific notifications count channel
      stompClient.subscribe(`/user/${userId}/notifications-count`, (message: IMessage) => {
        try {
          // Parse the notification count from the message
          const count = parseInt(message.body, 10);
          
          // Update notifications count, ensuring it's not negative
          setNotificationsCount(Math.max(0, count));
        } catch (parseError) {
          console.error('Error parsing notifications count:', parseError);
          toast.error('Failed to process notifications');
        }
      });
    };

    // Error handling
    stompClient.onStompError = frame => {
      console.error('Broker reported notifications error:', frame.headers['message']);
      console.error('Details:', frame.body);
      toast.error('Notifications connection error');
      setIsConnected(false);
    };

    stompClient.onWebSocketError = event => {
      console.error('WebSocket notifications connection error:', event);
      toast.error('Unable to establish notifications connection');
      setIsConnected(false);
    };

    // Activate the connection
    stompClient.activate();
    stompClientRef.current = stompClient;

    // Cleanup on component unmount
    return () => {
      stompClient.deactivate();
      stompClientRef.current = null;
      setIsConnected(false);
    };
  }, [userId]);

  return {
    notificationsCount,
    isConnected
  };
};
