import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/User';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { userId, results } = await request.json();

    // Validate input
    if (!userId || !results) {
      return NextResponse.json(
        { error: 'User ID and results are required' },
        { status: 400 }
      );
    }

    // Update user with assessment results
    const user = await User.findByIdAndUpdate(
      userId,
      {
        hasCompletedAssessment: true,
        assessmentResults: results,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        email: user.email,
        hasCompletedAssessment: user.hasCompletedAssessment,
        assessmentResults: user.assessmentResults,
      },
    });
  } catch (error: any) {
    console.error('Assessment save error:', error);
    return NextResponse.json(
      { error: error.message || 'Something went wrong saving assessment' },
      { status: 500 }
    );
  }
}