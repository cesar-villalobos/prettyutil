export default class RutUtil {
  public clean = (rut: string): string => {
    return rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase();
  };

  public format = (rut: string): string => {
    rut = this.clean(rut);
    let result = rut;

    if (rut.length > 1) {
      result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
      for (let i = 4; i < rut.length; i += 3) {
        result = rut.slice(-3 - i, -i) + '.' + result;
      }
    }

    return result;
  };

  public calculateDv = (rut: string): string => {
    let suma = 0;
    const rutReversa = this.clean(rut).split('').reverse();

    for (let i = 0, j = 2; i < rutReversa.length; i++, j < 7 ? j++ : (j = 2)) {
      suma += parseInt(rutReversa[i]) * j;
    }

    const resultado = 11 - (suma % 11);
    if (resultado === 11) return '0';
    if (resultado === 10) return 'k';
    return String(resultado);
  };

  public validate = (rut: string | undefined): boolean => {
    if (rut) {
      const rutSinFormato = this.clean(rut);
      const rutSinDv = rutSinFormato.slice(0, -1);
      const rutDv = rutSinFormato.split('').pop().toLowerCase();
      return this.calculateDv(rutSinDv) === rutDv;
    } else {
      return false;
    }
  };
}
