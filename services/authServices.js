import User from "../models/User.js";

export const findUser = (filter) => User.findOne(filter);

export const signup = (data) => User.create(data);

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);

export const updAvatar = (userId, updateData) => {
  return  User.findByIdAndUpdate(userId, updateData, {
    returnDocument: "after",
  }).select("avatarURL -_id");
};
