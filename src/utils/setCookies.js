export const setCookies = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expire: 1000 * 60 * 60 * 24 * 30
  });
};