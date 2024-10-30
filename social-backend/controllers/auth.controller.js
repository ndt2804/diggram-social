import {
  registerUserService,
  loginUserService,
  userSignOutService,
  refreshTokenService,
  getUserService,
  updateUserService,
  changePasswordUserService,
  updatePasswordService,
  resetPasswordService,
  checkEmailService,
  searchUser,
  getSuggestedUsers,
} from "../services/auth.service.js";

export async function registerUser(req, res) {
  const { username, fullname, email, password } = req.body;
  try {
    const user = await registerUserService(username, fullname, email, password);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
}

export async function logInUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await loginUserService(email, password);
    res.cookie('accessToken', user.accessToken, { httpOnly: true, secure: true });
    res.cookie('refreshToken', user.refreshToken, { httpOnly: true, secure: true });
    res.status(201).json(user)
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login failed" });
  }
}
export async function signOutUser(req, res) {
  const { userId } = req.body;
  try {
    const result = await userSignOutService(userId);
    if (result) {
      res.clearCookie('accessToken', { httpOnly: true, secure: true, path: '/' });
      res.clearCookie('refreshToken', { httpOnly: true, secure: true, path: '/' });
      res.status(200).json({ message: 'Signed out successfully' });
    } else {
      res.status(400).json({ message: 'User not found or sign out failed' });
    }
  } catch (error) {
    console.error('Sign out error:', error);
    res.status(500).json({ message: 'An error occurred during sign out' });
  }
}

export async function getUser(req, res) {
  try {
    const user = await getUserService(req.params.slug);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send((error));
  }
}

export async function refreshToken(req, res) {
  try {
    const newAccessToken = await refreshTokenService(req.headers.cookie);
    res.cookie('accessToken', newAccessToken.newToken, { httpOnly: true, secure: true });
    res.status(200).send(newAccessToken);
  } catch (error) {
    return res.status(500).send((error));
  }
}



export async function updateUser(req, res) {
  const { username, fullname, email } = req.body;

  try {
    const user = await updateUserService(req.params.slug, username, fullname, email);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send((error));
  }
}



export async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await changePasswordUserService(req.params.slug, oldPassword, newPassword);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send((error));
  }
}

export async function verifyEmail(req, res) {
  const { email, token } = req.query;

  if (checkEmailService(email, token)) {
    res.status(200).json({ message: 'Token hợp lệ. Vui lòng cập nhật mật khẩu.' });
  } else {
    res.status(400).json({ error: 'Token không hợp lệ.' });
  }
}
export async function updatePassword(req, res) {
  const { email } = req.query;
  const { password } = req.body;
  try {
    const result = await updatePasswordService(email, password);
    res.status(200).send(result);
  } catch (error) {
    return res.status(500).send((error));
  }
}

export async function resetPassword(req, res) {
  const { email } = req.body;

  try {
    const user = await resetPasswordService(email);
    res.status(200).send(user);
  } catch (error) {
    return res.status(500).send((error));
  }
}

export const searchUserController = async (req, res) => {
  const { query } = req.query; // Lấy từ query string

  try {
    const users = await searchUser(query);
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: 'Error searching users', error: error.message });
  }
};
export const getSuggestedUsersController = async (req, res) => {
  try {
    const users = await getSuggestedUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};