//validate password
function Password(password) {
    return password.length >= 6;
  }
  
  describe('validPassword', () => {
    it('should return pass for valid passwords', () => {
      expect(Password('testte')).toBe(true);
    });
  
    it('should return fail for invalid passwords', () => {
      expect(Password('tes')).toBe(false);
    });
  });