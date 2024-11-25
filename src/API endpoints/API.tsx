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
    console.log(response);
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
    console.log(response);
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

export const AddToGroupsEP = async (group_name: string) => {
  try {
    const userGroups = await fetch(`${import.meta.env.VITE_END_POINT}/groups`, {
      method: "POST",
      headers: { "Content-type": "application-json" },
      body: JSON.stringify({ group_name }),
    });
    const response = await userGroups.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
export const AddToGroupMembersEP = async (
  group_id: string,
  user_id: string
) => {
  try {
    const userGroups = await fetch(
      `${import.meta.env.VITE_END_POINT}/groups/group_member`,
      {
        method: "POST",
        headers: { "Content-type": "application-json" },
        body: JSON.stringify({ user_id, group_id }),
      }
    );
    const response = await userGroups.json();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
