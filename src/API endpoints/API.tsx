const token = localStorage.getItem("jwt");

export const LoginEndpoint = async (
  username: string,
  user_password: string
) => {
  try {
    const user = await fetch(`${import.meta.env.VITE_END_POINT}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, user_password }),
    });

    const response = await user.json();
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const SignUpEndpoint = async (
  username: string,
  user_password: string
) => {
  try {
    const user = await fetch(`${import.meta.env.VITE_END_POINT}/api/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, user_password }),
    });

    const response = await user.json();
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const TokenUserInfo = async () => {
  try {
    const user = await fetch(`${import.meta.env.VITE_END_POINT}/api/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await user.json();
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllGroups = async (userID: string) => {
  console.log(`the id ${userID}`);
  try {
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/groups/group_data`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userID }),
      }
    );
    const response = await userGroups.json();

    console.log(response.groups);
    return response.groups;
  } catch (error) {
    console.log(error);
  }
};

export const AddToGroupsEP = async (
  chat_name: string,
  chat_password: string
) => {
  console.log(`chat name: ${chat_name}`);
  try {
    const userGroups = await fetch(`${import.meta.env.VITE_END_POINT}/groups`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ chat_name, chat_password }),
    });
    const response = await userGroups.json();
    console.log(response.group_ID.group_id);
    return response.group_ID.group_id;
  } catch (error) {
    console.log(error);
  }
};
export const AddToGroupMembersEP = async (
  group_id: string,
  user_id: string
) => {
  try {
    console.log(`Group ID: ${group_id}, User ID: ${user_id}`);
    const response = await fetch(
      `${import.meta.env.VITE_END_POINT}/groups/group_member`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id, group_id }),
      }
    );

    // Check if the HTTP response is not OK
    if (!response.ok) {
      const errorData = await response.json(); // Parse error message
      throw new Error(errorData.message || "Error adding member to group");
    }
    const Parsedresponse = await response.json();

    console.log(Parsedresponse);
    return Parsedresponse;
  } catch (error) {
    console.error("Error in AddToGroupMembersEP:", error);
    throw error; // Rethrow the error for frontend handling
  }
};

export const PostMessage = async (
  text: string,
  group_id: string,
  user_id: string
) => {
  try {
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/messages`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, user_id, group_id }),
      }
    );
    const response = await userGroups.json();

    //console.log(response.message_id);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const GetGroupMessages = async (group_id: string) => {
  try {
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/messages?group_id=${group_id}`
    );
    const response = await userGroups.json();

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const GetGroup = async (group_name: string, chat_password: string) => {
  try {
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/groups/single_group_id`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ group_name, chat_password }),
      }
    );
    const response = await userGroups.json();
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error in Getting group ID:", error);
    throw error; // Rethrow the error for frontend handling
  }
};
