export const VALID_VALUE = {
  commentMaxLength: 1000,
  email:
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/,
  username: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])|(?=.*[0-9]).{1,20}$/,
  password:
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
};
