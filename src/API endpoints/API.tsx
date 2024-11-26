export const LoginEndpoint = async (
  username: string,
  user_password: string
) => {
  try {
    const user = await fetch(
      `${
        import.meta.env.VITE_END_POINT
      }/users/login?username=${username}&user_password=${user_password}`
    );

    const response = await user.json();
    console.log(response.user.user_id);
    return response.user.user_id;
  } catch (error) {
    console.log(error);
  }
};

export const SignUpEndpoint = async (
  username: string,
  user_password: string
) => {
  try {
    const user = await fetch(`${import.meta.env.VITE_END_POINT}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, user_password }),
    });

    const response = await user.json();
    console.log(response.user_id);
    return response.user_id;
  } catch (error) {
    console.log(error);
  }
};

export const GetAllGroups = async (userID: string) => {
  try {
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/groups/group_data?${userID}`
    );
    const response = await userGroups.json();
    console.log(response);
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
      headers: { "Content-type": "application/json" },
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
    console.log(`the group id${group_id}`);
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/groups/group_member`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user_id, group_id }),
      }
    );
    const response = await userGroups.json();

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
