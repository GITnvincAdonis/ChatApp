export interface GroupData {
    group_id: string;
    group_name: string;
    chat_password: string;
    user_id: string;
  }

export interface Member {
    user_id: string;
    username: string;
  }
export interface Message {
    message_id: string;
    message_string: string;
    message_senddate: string;
    group_id: string;
    user_id: string;
  }