const rutLikePattern = (): RegExp =>
  /^(\d{0,2})\.?(\d{3})\.?(\d{3})-?(\d|k)$/gi;
const suspiciousRutPattern = (): RegExp =>
  /^(\d)\1?\.?(\1{3})\.?(\1{3})-?(\d|k)?$/gi;

export const isRutLike = (rut: string): boolean => rutLikePattern().test(rut);
export const isSuspiciousRut = (rut: string): boolean =>
  suspiciousRutPattern().test(rut);
export const cleanRut = (rut: string): string =>
  isRutLike(rut) ? rut.replace(/[^0-9k]/gi, '') : '';
export const getRutDigits = (rut: string): string => cleanRut(rut).slice(0, -1);
export const getRutVerifier = (rut: string): string => cleanRut(rut).slice(-1);

type DeconstructedRut = {
  digits: string;
  verifier: string;
};
export const deconstructRut = (rut: string): DeconstructedRut => ({
  digits: getRutDigits(rut),
  verifier: getRutVerifier(rut),
});

export enum RutFormat {
  DOTS,
  DASH,
  DOTS_DASH,
}

export const formatRut = (
  rut: string,
  format = RutFormat.DOTS_DASH,
): string => {
  if (!isRutLike(rut)) return rut;

  switch (format) {
    case RutFormat.DOTS:
      return rut.replace(
        rutLikePattern(),
        (...args) =>
          `${args[1] ? `${args[1]}.` : ''}${args[2]}.${args[3]}${args[4]}`,
      );

    case RutFormat.DASH:
      return rut.replace(rutLikePattern(), '$1$2$3-$4');

    case RutFormat.DOTS_DASH:
      return rut.replace(
        rutLikePattern(),
        (...args) =>
          `${args[1] ? `${args[1]}.` : ''}${args[2]}.${args[3]}-${args[4]}`,
      );

    default:
      return rut.replace(rutLikePattern(), '$1$2$3$4');
  }
};

export const calculateRutVerifier = (digits: string): string => {
  let sum = 0;
  let mul = 2;

  let i = digits.length;
  while (i--) {
    sum = sum + parseInt(digits.charAt(i)) * mul;
    if (mul % 7 === 0) {
      mul = 2;
    } else {
      mul++;
    }
  }

  const res = sum % 11;

  if (res === 0) {
    return '0';
  } else if (res === 1) {
    return 'k';
  }

  return `${11 - res}`;
};

export const validateRut = (rut: string, noSuspicious = true): boolean => {
  if (!isRutLike(rut)) return false;
  if (noSuspicious && isSuspiciousRut(rut)) return false;
  return getRutVerifier(rut) === calculateRutVerifier(getRutDigits(rut));
};

type RutListResult = Map<string, boolean>;
export const validateRutList = (
  ruts: string[],
  noSuspicious = true,
): RutListResult => {
  return ruts.reduce<RutListResult>((result, rut) => {
    result.set(rut, validateRut(rut, noSuspicious));
    return result;
  }, new Map<string, boolean>());
};

export const generateRut = (): string => {
  // tslint:disable-next-line:insecure-random
  const digits = Math.floor(10000003 + Math.random() * 90000000).toString();
  const verifier = calculateRutVerifier(digits);
  return formatRut(digits + verifier);
};

export const clean = (rut: string): string => {
  return typeof rut === 'string'
    ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
    : '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dv = (T: any): number | string => {
  let M = 0,
    S = 1;
  for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
  return S ? S - 1 : 'k';
};

export const valida = (rut: string): boolean => {
  const rutCleaned = clean(rut);
  if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCleaned)) return false;
  const tmp = rutCleaned.split('-');
  let digv = tmp[1];
  const rutOut = tmp[0];
  if (digv == 'K') digv = 'k';
  return dv(rutOut) == digv;
};

export const validate = (rut: string): boolean => {
  if (typeof rut !== 'string') {
    return false;
  }
  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false;
  }

  rut = clean(rut);

  let t = parseInt(rut.slice(0, -1), 10);
  let m = 0;
  let s = 1;

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
    t = Math.floor(t / 10);
  }

  const v = s > 0 ? '' + (s - 1) : 'K';
  return v === rut.slice(-1);
};

export const format = (rut: string): string => {
  rut = clean(rut);
  let result;

  if (rut.length > 2) {
    result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
    for (let i = 4; i < rut.length; i += 3) {
      result = rut.slice(-3 - i, -i) + '.' + result;
    }
  } else {
    result = rut;
  }

  return result;
};

/*
export const limpiarRUT = (rut: string): string => {
  return String(rut).replace(/[^0-9a-z]/gi, '');
};*/

export const calcularDv = (rut: string): string => {
  let suma = 0;
  const rutReversa = clean(rut).split('').reverse();

  for (let i = 0, j = 2; i < rutReversa.length; i++, j < 7 ? j++ : (j = 2)) {
    suma += parseInt(rutReversa[i]) * j;
  }

  const resultado = 11 - (suma % 11);
  if (resultado === 11) return '0';
  if (resultado === 10) return 'k';
  return String(resultado);
};

export const validarRUT = (rut: string): boolean => {
  if (typeof rut === 'string' || typeof rut === 'number') {
    const rutSinFormato = clean(rut);
    if (rutSinFormato) {
      const rutSinDv = rutSinFormato.slice(0, -1);
      const rutDv = rutSinFormato.split('').pop().toLowerCase();
      return calcularDv(rutSinDv) === rutDv;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
