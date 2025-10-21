import Validator from './validator';

const validator = new Validator();

// Тестовые примеры
const testUsernames = [
  'john',
  'john123',
  'user-name',
  'user_name',
  '123john',
  'john123',
  'john1234',
  'Super_User-123',
  'user1234name',
  'юзернейм',
  'john@doe',
  '',
  'user-',
  '_user',
];

console.log('Username validation results:');
testUsernames.forEach((username) => {
  const isValid = validator.validateUsername(username);
  console.log(`"${username}" -> ${isValid ? 'VALID' : 'INVALID'}`);
});

