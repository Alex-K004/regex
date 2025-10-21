import Validator from '../src/validator';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('Valid usernames', () => {
    test('should allow valid username with letters only', () => {
      expect(validator.validateUsername('john')).toBe(true);
      expect(validator.validateUsername('Mary')).toBe(true);
    });

    test('should allow valid username with letters, hyphens and underscores in middle', () => {
      expect(validator.validateUsername('user-name')).toBe(true);
      expect(validator.validateUsername('user_name')).toBe(true);
      expect(validator.validateUsername('user-name_test')).toBe(true);
    });

    test('should allow digits in the middle of username', () => {
      expect(validator.validateUsername('user123name')).toBe(true);
      expect(validator.validateUsername('john123doe')).toBe(true);
    });

    test('should allow exactly three digits in a row in middle', () => {
      expect(validator.validateUsername('abc123def')).toBe(true);
      expect(validator.validateUsername('test123user')).toBe(true);
    });

    test('should allow complex valid usernames', () => {
      expect(validator.validateUsername('SuperUser123Test')).toBe(true);
      expect(validator.validateUsername('Test-User_name')).toBe(true);
      expect(validator.validateUsername('User123Name')).toBe(true);
    });
  });

  describe('Invalid usernames', () => {
    test('should not allow username starting with digit', () => {
      expect(validator.validateUsername('123john')).toBe(false);
      expect(validator.validateUsername('1user')).toBe(false);
    });

    test('should not allow username ending with digit', () => {
      expect(validator.validateUsername('john123')).toBe(false);
      expect(validator.validateUsername('user123')).toBe(false);
    });

    test('should not allow username starting with underscore', () => {
      expect(validator.validateUsername('_john')).toBe(false);
      expect(validator.validateUsername('_user123')).toBe(false);
    });

    test('should not allow username ending with underscore', () => {
      expect(validator.validateUsername('john_')).toBe(false);
      expect(validator.validateUsername('user_')).toBe(false);
    });

    test('should not allow username starting with hyphen', () => {
      expect(validator.validateUsername('-john')).toBe(false);
      expect(validator.validateUsername('-user')).toBe(false);
    });

    test('should not allow username ending with hyphen', () => {
      expect(validator.validateUsername('john-')).toBe(false);
      expect(validator.validateUsername('user-')).toBe(false);
    });

    test('should not allow more than three digits in a row', () => {
      expect(validator.validateUsername('john1234')).toBe(false);
      expect(validator.validateUsername('user1234name')).toBe(false);
      expect(validator.validateUsername('abc1234def')).toBe(false);
    });

    test('should not allow special characters', () => {
      expect(validator.validateUsername('john@doe')).toBe(false);
      expect(validator.validateUsername('user!name')).toBe(false);
      expect(validator.validateUsername('admin#123')).toBe(false);
    });

    test('should not allow cyrillic characters', () => {
      expect(validator.validateUsername('юзернейм')).toBe(false);
      expect(validator.validateUsername('пользователь')).toBe(false);
    });

    test('should handle empty string', () => {
      expect(validator.validateUsername('')).toBe(false);
    });

    test('should reject complex invalid usernames', () => {
      expect(validator.validateUsername('123User-Name')).toBe(false); // начинается с цифры
      expect(validator.validateUsername('User-Name456')).toBe(false); // заканчивается цифрой
      expect(validator.validateUsername('User1234Name')).toBe(false); // 4 цифры подряд
      expect(validator.validateUsername('-User123Name')).toBe(false); // начинается с тире
      expect(validator.validateUsername('User123Name_')).toBe(false); // заканчивается подчёркиванием
    });

    test('should allow names with digits not at edges', () => {
      expect(validator.validateUsername('a1b')).toBe(true);
      expect(validator.validateUsername('hello123world')).toBe(true);
      expect(validator.validateUsername('test123test')).toBe(true);
    });
  });
});