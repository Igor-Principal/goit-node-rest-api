import HttpError from "../helpers/HttpError.js";

const isValideBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(HttpError(400, "Body must have at least one fields"));
  }
  next();
};

export default isValideBody;
