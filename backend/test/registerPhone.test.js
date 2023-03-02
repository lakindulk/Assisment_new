//Valid PhoneNumber
function PhoneNumbervalidation(phone) {
  var re = /^\d{10}$/;
  return re.test(phone);
}

describe('PhoneNumbervalidation', () => {
  it('should return true (pass) for valid phone numbers with 10 numbers', () => {
    expect(PhoneNumbervalidation('0123456789')).toBe(true);
  });

  it('should return false for invalid phone numbers', () => {
    expect(PhoneNumbervalidation('01234567891')).toBe(false);
  });
});