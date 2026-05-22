// Simulating signup validation logic integration
function validateSignUpData(data) {
  const errors = {};
  if (!data.email || !data.email.includes('@')) {
    errors.email = 'Invalid email address';
  }
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

describe('Auth Validation - Integration Tests', () => {
  it('should pass validation with valid signup inputs', () => {
    const validUser = { email: 'student@deakin.edu.au', password: 'securepassword123' };
    const result = validateSignUpData(validUser);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  it('should reject invalid emails and short passwords', () => {
    const invalidUser = { email: 'bademail', password: '123' };
    const result = validateSignUpData(invalidUser);
    expect(result.isValid).toBe(false);
    expect(result.errors.email).toBe('Invalid email address');
    expect(result.errors.password).toBe('Password must be at least 6 characters');
  });
});