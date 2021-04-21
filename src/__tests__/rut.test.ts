import { rutTools } from '../main';

describe('cleanRut', () => {
  it('Should clean a rut-like string or return an empty string', () => {
    expect(rutTools.clean('15.171.143-k')).toEqual('15171143K');
    expect(rutTools.clean('22456765-3')).toEqual('224567653');
    expect(rutTools.clean('08084750-5')).toEqual('80847505');
    expect(rutTools.clean('1-8384889-5')).toEqual('183848895');
    expect(rutTools.clean('asdrewldk')).toEqual('K');
    expect(rutTools.clean('asdrewld33334ddsssks')).toEqual('33334K');
    expect(rutTools.clean('')).toEqual('');
    expect(rutTools.clean(' ')).toEqual('');
    expect(rutTools.clean('-')).toEqual('');
    expect(rutTools.clean('.')).toEqual('');
    expect(rutTools.clean('35fdlp34/d')).toEqual('3534');
    expect(rutTools.clean(undefined)).toEqual('');
    expect(rutTools.clean(null)).toEqual('');
  });
});

describe('validateRut', () => {
  it('Should validate a rut-like string', () => {
    const validRuts = [
      '7775735-K',
      '18585543-0',
      '18348353-6',
      '06099089-1',
      '21.44.509.7-6',
      '16790842-k',
    ];
    const invalidRuts = [
      '',
      '9.999.999-9',
      '14355245-5',
      '34566754-K',
      '12.344.568-4',
      '32.456.356-k',
      undefined,
      null,
      '-',
      '+',
    ];

    validRuts.forEach((test) => {
      expect(rutTools.validate(test)).toEqual(true);
    });

    invalidRuts.forEach((test) => {
      expect(rutTools.validate(test)).toEqual(false);
    });
  });
});

describe('formatRut', () => {
  it('Should format rut values', () => {
    expect(rutTools.format('')).toEqual('');
    expect(rutTools.format('1')).toEqual('1');
    expect(rutTools.format('4')).toEqual('4');
    expect(rutTools.format('1-98765432')).toEqual('19.876.543-2');
    expect(rutTools.format('19')).toEqual('1-9');
    expect(rutTools.format(undefined)).toEqual('');
    expect(rutTools.format(null)).toEqual('');
  });
});

describe('CalculateDv', () => {
  it('Should calculate DV values', () => {
    expect(rutTools.calculateDv('')).toEqual('');
    expect(rutTools.calculateDv(undefined)).toEqual('');
    expect(rutTools.calculateDv(null)).toEqual('');
    expect(rutTools.calculateDv('16495221')).toEqual('5');
    expect(rutTools.calculateDv('5433151')).toEqual('7');
    expect(rutTools.calculateDv('15280511')).toEqual('K');
    expect(rutTools.calculateDv('22749162')).toEqual('0');
  });
});
