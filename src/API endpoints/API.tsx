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
