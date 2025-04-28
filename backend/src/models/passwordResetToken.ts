import { model, ObjectId, Schema } from "mongoose";
import { hash, compare } from "bcrypt";

// interface (typescript)
interface PasswordResetTokenDocument {
  owner: ObjectId;
  token: string;
  createAt: Date;
}

interface Methods {
  compareToken(token: string): Promise<boolean>;
}

// schema (javascript)
const passwordResetTokenSchema = new Schema<
  PasswordResetTokenDocument,
  {},
  Methods
>({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600, // 60 min * 60 sec
    default: Date.now(),
  },
});

passwordResetTokenSchema.pre("save", async function (next) {
  // hash the token
  if (this.isModified("token")) {
    this.token = await hash(this.token, 10);
  }
  next();
});

passwordResetTokenSchema.methods.compareToken = async function (token) {
  const result = await compare(token, this.token);
  return result;
};

export default model<PasswordResetTokenDocument, {}, Methods>(
  "PasswordResetToken",
  passwordResetTokenSchema
);
