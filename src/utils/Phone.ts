export default class PhoneUtil {
  public clean = (phone: string | undefined | null): string => {
    if (!phone) return '';
    return phone.replace(/[^0-9]+/g, '').toUpperCase();
  };

  public format = (phone: string | undefined | null): string => {
    if (!phone) return '';
    return this.clean(phone);
  };

  public addPrefix = (
    phone: string | undefined | null,
    prefix = '56',
    large = 11,
  ): string => {
    if (!phone) return '';
    phone = this.clean(phone);

    if (
      phone.length != large &&
      phone.slice(0, prefix.length) != prefix &&
      phone.length > prefix.length
    ) {
      phone = prefix + phone;
    }

    return phone;
  };

  public validate = (
    phone: string | undefined | null,
    prefix = '56',
    large = 11,
  ): boolean => {
    if (!phone) return false;
    phone = this.addPrefix(phone);

    if (phone.length == large && phone.slice(0, prefix.length) == prefix) {
      return true;
    } else {
      return false;
    }
  };
}
