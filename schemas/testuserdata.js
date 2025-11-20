const testUserData = [
  // VALID DATA (should pass validation)
  {
    name: 'Valid complete user',
    data: {
      email: 'john.doe@example.com',
      username: 'johndoe',
      password: 'SecurePass123!'
    },
    shouldPass: true
  },
  {
    name: 'Valid with special chars in username',
    data: {
      email: 'alice_smith@test.org',
      username: 'alice_123_user',
      password: 'AnotherValidPass456@'
    },
    shouldPass: true
  },
  {
    name: 'Valid with max length username',
    data: {
      email: 'maxuser@domain.com',
      username: 'this_username_is_exactly_32_chars',
      password: 'ValidPassword789#'
    },
    shouldPass: true
  },
  {
    name: 'Valid with different email format',
    data: {
      email: 'user.name+tag@example.co.uk',
      username: 'user123',
      password: 'ComplexPass!@#789'
    },
    shouldPass: true
  },

  // INVALID EMAILS (should fail)
  {
    name: 'Invalid email format',
    data: {
      email: 'not-an-email',
      username: 'validuser',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Email with no domain',
    data: {
      email: 'user@',
      username: 'validuser',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Email with no @ symbol',
    data: {
      email: 'userdomain.com',
      username: 'validuser',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Too long email',
    data: {
      email: 'a_very_long_email_address_that_exceeds_255_characters_and_should_cause_an_error@example.com.domain.subdomain.level3.level4.very.long.domain.name.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension.extension......com',
      username: 'validuser',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },

  // INVALID USERNAMES (should fail)
  {
    name: 'Username too short',
    data: {
      email: 'test@example.com',
      username: 'ab',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Username too long',
    data: {
      email: 'test@example.com',
      username: 'this_username_is_definitely_more_than_thirty_two_characters_and_should_fail',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Username with invalid characters',
    data: {
      email: 'test@example.com',
      username: 'user@name', // contains @ symbol
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Username with spaces',
    data: {
      email: 'test@example.com',
      username: 'user name',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },

  // INVALID PASSWORDS (should fail)
  {
    name: 'Password too short',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: 'weak'
    },
    shouldPass: false
  },
  {
    name: 'Password missing uppercase',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: 'alllowercase123!'
    },
    shouldPass: false
  },
  {
    name: 'Password missing lowercase',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: 'ALLUPPERCASE123!'
    },
    shouldPass: false
  },
  {
    name: 'Password missing number',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: 'NoNumbers!@#'
    },
    shouldPass: false
  },
  {
    name: 'Password missing special character',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: 'NoSpecialChar123'
    },
    shouldPass: false
  },
  {
    name: 'Password with only letters',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: 'OnlyLetters'
    },
    shouldPass: false
  },
  {
    name: 'Password with only numbers',
    data: {
      email: 'test@example.com',
      username: 'validuser',
      password: '12345678'
    },
    shouldPass: false
  },

  // MISSING FIELDS (should fail)
  {
    name: 'Missing email',
    data: {
      username: 'validuser',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Missing username',
    data: {
      email: 'test@example.com',
      password: 'ValidPassword123!'
    },
    shouldPass: false
  },
  {
    name: 'Missing password',
    data: {
      email: 'test@example.com',
      username: 'validuser'
    },
    shouldPass: false
  },

  // EDGE CASES (should fail)
  {
    name: 'Empty strings',
    data: {
      email: '',
      username: '',
      password: ''
    },
    shouldPass: false
  },
  {
    name: 'Null values',
    data: {
      email: null,
      username: null,
      password: null
    },
    shouldPass: false
  },
  {
    name: 'Whitespace only',
    data: {
      email: '   ',
      username: '   ',
      password: '   '
    },
    shouldPass: false
  }
];

export default testUserData