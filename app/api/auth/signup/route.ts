import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { fullName, email, password, userType, companyName } = body;

    console.log("Signup API received:", { fullName, email, userType, companyName });

    // Validate input
    if (!fullName || !email || !password || !userType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (userType === 'employer' && !companyName) {
      return NextResponse.json(
        { error: 'Company name is required for employers' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with explicit userType
    const userData = {
      fullName,
      email: email.toLowerCase(),
      password: hashedPassword,
      userType: userType, // Explicitly set this
      hasCompletedAssessment: false,
    };

    // Add companyName only if employer
    if (userType === 'employer') {
      userData.companyName = companyName;
    }

    console.log("Creating user with data:", userData);

    const user = await User.create(userData);

    console.log("User created:", {
      id: user._id.toString(),
      email: user.email,
      userType: user.userType,
    });

    const responseData = {
      success: true,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        userType: user.userType,
        hasCompletedAssessment: user.hasCompletedAssessment,
        companyName: user.companyName,
      },
    };

    console.log("Sending response:", responseData);

    return NextResponse.json(responseData);
  } catch (error: any) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong during signup' },
      { status: 500 }
    );
  }
}