export function emailValidator(email) {
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!EMAIL_REGEX.test(email)) {
    return "유효한 이메일 형식이 아닙니다.";
  }
}
export function passwordValidator(password) {
  if (!password) {
    return "비밀번호는 필수입니다.";
  }
}

export function validateLogin({ email, password }) {
  const errors = {};

  const emailError = emailValidator(email);
  const passwordError = passwordValidator(password);

  if (emailError) {
    errors.email = emailError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }

  return errors;
}
