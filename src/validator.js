export default class Validator {
  validateUsername(username) {
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return false;
    }

    if (/^[0-9_-]/.test(username)) {
      return false;
    }

    if (/[0-9_-]$/.test(username)) {
      return false;
    }

    if (/\d{4,}/.test(username)) {
      return false;
    }

    return true;
  }
}