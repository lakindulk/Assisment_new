//Valid Email
function emailValidation(email) {
  var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return re.test(String(email).toLowerCase());
}

describe('emailvalidated', () => {
  it(' Return true (pass) for valid emails', () => {
    expect(emailValidation('testemail@test.com')).toBe(true);
  });

  it(' Return false (fail) for invalid emails', () => {
    expect(emailValidation('invalid')).toBe(false);
  });
});

