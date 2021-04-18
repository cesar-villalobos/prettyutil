import { phoneTools } from '../main';

describe('cleanPhone', () => {
  it('Should clean a phone-like string or return an empty string', () => {
    expect(phoneTools.clean('+56 9 7888 6166')).toEqual('56978886166');
    expect(phoneTools.clean('+(156) 422 1234')).toEqual('1564221234');
    expect(phoneTools.clean('+(AKKE) KKE,,WLSKKF4')).toEqual('4');
    expect(phoneTools.clean('')).toEqual('');
    expect(phoneTools.clean('+')).toEqual('');
    expect(phoneTools.clean(' ')).toEqual('');
    expect(phoneTools.clean('35fdlp34/d')).toEqual('3534');
    expect(phoneTools.clean(undefined)).toEqual('');
    expect(phoneTools.clean(null)).toEqual('');
  });
});

describe('formatPhone', () => {
  it('Should format phone values', () => {
    expect(phoneTools.format('')).toEqual('');
    expect(phoneTools.format('1')).toEqual('1');
    expect(phoneTools.format('4')).toEqual('4');
    expect(phoneTools.format('9 7888 6166')).toEqual('978886166');
    expect(phoneTools.format(undefined)).toEqual('');
    expect(phoneTools.format(null)).toEqual('');
  });
});

describe('addPrefixPhone', () => {
  it('Should add Prefix phone values', () => {
    expect(phoneTools.addPrefix('')).toEqual('');
    expect(phoneTools.addPrefix('1')).toEqual('1');
    expect(phoneTools.addPrefix('12')).toEqual('12');
    expect(phoneTools.addPrefix('123')).toEqual('56123');
    expect(phoneTools.addPrefix('978886166')).toEqual('56978886166');
    expect(phoneTools.addPrefix('978886166', '1')).toEqual('1978886166');
    expect(phoneTools.addPrefix('978886166', '13')).toEqual('13978886166');
    expect(phoneTools.addPrefix('978886166', '14')).toEqual('14978886166');
    expect(phoneTools.addPrefix('56978886166')).toEqual('56978886166');
    expect(phoneTools.addPrefix('19788', '1', 5)).toEqual('19788');
    expect(phoneTools.addPrefix('9788', '1', 5)).toEqual('19788');
    expect(phoneTools.addPrefix('13978886166', '13')).toEqual('13978886166');
    expect(phoneTools.addPrefix('14978886166', '14')).toEqual('14978886166');
    expect(phoneTools.addPrefix(undefined)).toEqual('');
    expect(phoneTools.addPrefix(null)).toEqual('');
  });
});

describe('validatePhone', () => {
  it('Should validate a phone-like string', () => {
    const validPhones = [
      '978886166',
      '56978886166',
      '+56 9 7888 6166',
      '981542465',
      '+56 981542465',
    ];
    const invalidPhones = ['', '1234', '112345', '123456', undefined, null];

    validPhones.forEach((test) => {
      expect(phoneTools.validate(test)).toEqual(true);
    });

    invalidPhones.forEach((test) => {
      expect(phoneTools.validate(test)).toEqual(false);
    });
  });
});
