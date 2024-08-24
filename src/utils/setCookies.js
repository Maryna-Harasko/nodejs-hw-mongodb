export const setCookies = (res, session) => {
  res.cookie("refreshToken", session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  });
  res.cookie("sessionId", session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
  });
};