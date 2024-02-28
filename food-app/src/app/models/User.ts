import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";

interface IUser {
  email: string;
  password: string;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          return value.length >= 6;
        },
      },
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.post("validate", function (doc: IUser) {
  const salt = bcrypt.genSaltSync(10);
  doc.password = bcrypt.hashSync(doc.password, salt);
});

export const User =
  mongoose.models?.User || mongoose.model("User", UserSchema, "users");
