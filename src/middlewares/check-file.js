export const checkFile = (req, res, next) => {
  try {
    console.log(req.params.id);
    console.log(req.body);
  } catch (error) {
    next(error);
    console.error(error);
  }
};
