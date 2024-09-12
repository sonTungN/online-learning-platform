export const preventUnauthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/user/sign-in");
  }
};

export const preventAuthenticated = (req, res, next) => {
  if (req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
};
