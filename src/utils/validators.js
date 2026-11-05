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

export function passwordSignupValidator(password) {
  const PW_ENGLISH_REGEX = /[A-Za-z]/;
  const PW_NUMBER_REGEX = /\d/;

  if (!password) {
    return "비밀번호는 필수입니다.";
  } else if (password.length < 8) {
    return "비밀번호는 8자 이상이어야 합니다.";
  } else if (password.length > 12) {
    return "비밀번호는 12자 이하여야 합니다.";
  } else if (!PW_ENGLISH_REGEX.test(password)) {
    return "비밀번호는 영문을 1자 이상 포함해야 합니다.";
  } else if (!PW_NUMBER_REGEX.test(password)) {
    return "비밀번호는 숫자를 1자 이상 포함해야 합니다.";
  }
}

export function passwordConfirmValidator({ password, passwordConfirm }) {
  if (!passwordConfirm) {
    return "비밀번호 확인은 필수입니다.";
  } else if (password !== passwordConfirm) {
    return "비밀번호가 일치하지 않습니다.";
  }
}

export function nicknameValidator(nickname) {
  // 서버가 앞뒤 공백을 제거한 뒤 검증하므로 FE도 같은 기준으로 맞춘다
  const trimmedNickname = nickname.trim();

  if (!trimmedNickname) {
    return "닉네임은 필수입니다.";
  } else if (trimmedNickname.length < 2) {
    return "닉네임은 2자 이상이어야 합니다.";
  } else if (trimmedNickname.length > 10) {
    return "닉네임은 10자 이내이어야 합니다.";
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

export function validateSignup({ email, nickname, password, passwordConfirm }) {
  const errors = {};

  const emailError = emailValidator(email);
  const nicknameError = nicknameValidator(nickname);
  const passwordError = passwordSignupValidator(password);
  const passwordConfirmError = passwordConfirmValidator({ password, passwordConfirm });

  if (emailError) {
    errors.email = emailError;
  }
  if (nicknameError) {
    errors.nickname = nicknameError;
  }
  if (passwordError) {
    errors.password = passwordError;
  }
  if (passwordConfirmError) {
    errors.passwordConfirm = passwordConfirmError;
  }

  return errors;
}
