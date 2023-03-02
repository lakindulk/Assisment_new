//Unit Test for Captcha
function Captcha(userinput, expectedinput) {
    return userinput === expectedinput;
  }
  
  describe('validCaptcha', () => {
    it('should return Pass for valid Captcha inputs', () => {
      expect(Captcha('hGJi4K', 'hGJi4K')).toBe(true);
    });
  
    it('should return Fail for invalid Captcha inputs', () => {
      expect(Captcha('hGJi4K', 'hgjI4k')).toBe(false);
    });
  });