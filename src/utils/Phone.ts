export default class PhoneUtil {
  public clean = (phone: string): string => {
    return phone.replace(/[^0-9]+/g, '').toUpperCase();
  };

  public format = (phone: string): string => {
    return this.clean(phone);
  };

  public addPrefix = (phone: string, prefix = '56', large = 11): string => {
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

  public validate = (phone: string, prefix = '56', large = 11): boolean => {
    phone = this.addPrefix(phone);

    if (phone.length == large && phone.slice(0, prefix.length) == prefix) {
      return true;
    } else {
      return false;
    }
  };
}
