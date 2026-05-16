// Create application database
db = db.getSiblingDB('career_clarity');

// Create collections
db.createCollection('users');
db.createCollection('assessments');

// Create indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.assessments.createIndex({ userId: 1 });

print('MongoDB initialized successfully for Career Clarity!');