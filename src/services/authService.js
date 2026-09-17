const MOCK_DELAY_MS = 900;

function wait(ms = MOCK_DELAY_MS) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shouldRejectMockSignIn({ email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  return normalizedEmail === 'invalid@campusbite.edu' || password === 'wrongpassword';
}

export async function signIn(credentials) {
  await wait();

  if (shouldRejectMockSignIn(credentials)) {
    const error = new Error('Invalid email or password.');
    error.code = 'INVALID_CREDENTIALS';
    throw error;
  }

  return {
    id: 'student-demo',
    name: 'CampusBite Student',
    email: credentials.email.trim(),
    role: 'STUDENT',
  };
}

export async function signUp(payload) {
  await wait();

  return {
    id: 'student-demo',
    name: payload.fullName.trim(),
    email: payload.email.trim(),
    role: 'STUDENT',
  };
}

export async function requestPasswordReset() {
  await wait();
  return { ok: true };
}

export async function resetPassword() {
  await wait();
  return { ok: true };
}
