import mongoose, { Schema, model, models } from 'mongoose';

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  userType: 'jobseeker' | 'employer';
  hasCompletedAssessment: boolean;
  assessmentResults?: {
    Logic: number;
    Adaptability: number;
    EQ: number;
    Spatial: number;
    Risk: number;
  };
  companyName?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, 'Please provide a full name'],
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
    userType: {
      type: String,
      enum: ['jobseeker', 'employer'],
      required: true,
      // Remove default - force explicit value
    },
    hasCompletedAssessment: {
      type: Boolean,
      default: false,
    },
    assessmentResults: {
      Logic: { type: Number, default: 0 },
      Adaptability: { type: Number, default: 0 },
      EQ: { type: Number, default: 0 },
      Spatial: { type: Number, default: 0 },
      Risk: { type: Number, default: 0 },
    },
    companyName: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model<IUser>('User', UserSchema);

export default User;