# PRETTY Utils

Custom validation utils (currently for RUT and Phone)

## Rol Único Tributario (RUT)

Each chilean citizen has its own RUT number, that is unique and unrepeatable number that useful as a method of identification. This consists of an 8-digit number with a verification digit that can be from 0 to 9 or a K.

## Description

The utilities for the use of the RUT number, consist in a set of tools that allow you to verify the validity of the number, give it a format, clean and get verifier digit. The utilities for the use of the phone number, consist in a set of tools that allow you to verify the validity of the number acording to their lenght, give it a format, clean and add a prefix to phone number.

## Tools

## RUT Tools

- Give Format a RUT
- Clean the invalids characters RUT
- Calculate the verifier digit
- Verify if its a valid or invalid RUT

## Phone Tools

- Give Format a phone number
- Clean the invalids characters of phone
- Add a country prefix on a phone number if not exists
- Verify if a phone has a valid lenght (without special characters)

## Installation

```
npm install prettyutils --save
```

### General Use

```javascript
import { rutTools, phoneTools } from 'prettyutils';

rutTools.format((rut: string | undefined | null)); //Return string
rutTools.clean((rut: string | undefined | null)); //Return string
rutTools.calculateDv((rut: string | undefined | null)); //Return string
rutTools.validate((rut: string | undefined | null)); //Return boolean
phoneTools.format(
  (phone: string | undefined | null),
  (prefix: string),
  (large: number),
); //Return string
phoneTools.clean((rut: string | undefined | null)); //Return string
phoneTools.calculateDv((rut: string | undefined | null)); //Return string
phoneTools.validate((rut: string | undefined | null)); //Return boolean
```

## Examples

### Give Format for RUT number

Input: String Rut

```javascript
import { rutTools } from 'prettyutils';

rutTools.format('198765432'); // Returns 19.876.543-2
rutTools.format('19-8765-4-32'); // Returns 19.876.543-2
```

### Clean the invalids characters for a RUT number

Input: String Rut

```javascript
import { rutTools } from 'prettyutils';

rutTools.clean('08084750-5'); // Returns 80847505
rutTools.clean('1-8384889-5'); // Returns 183848895
```

### Calculate the verifier digit

Input: String Rut

```javascript
import { rutTools } from 'prettyutils';

rutTools.calculateDv('16495221'); // Returns 5
rutTools.calculateDv('15280511'); // Returns K
```

### Verify if its a valid or invalid RUT

Input: String Rut

```javascript
import { rutTools } from 'prettyutils';

rutTools.validate('06099089-1'); // Returns true
rutTools.validate('21.44.509.7-6'); // Returns true
rutTools.validate('34566754-K'); // Returns false
```

### Give Format for phone number

Input: String phone

```javascript
import { phoneTools } from 'prettyutils';

phoneTools.format('9 7888 6166'); // Returns 978886166
```

### Clean the invalids characters for a phone number

Input: String Phone

```javascript
import { phoneTools } from 'prettyutils';

phoneTools.clean('+(156) 422 1234'); // Returns 1564221234
phoneTools.clean('35fdlp34/d'); // Returns 3534
```

### Add a prefix to phone number if not exists

Input: String Phone

```javascript
import { phoneTools } from 'prettyutils';

phoneTools.addPrefix('978886666'); // Returns 56978886666
phoneTools.addPrefix('978886666', '1'); // Returns 1978886666
phoneTools.addPrefix('978886666', '13'); // Returns 13978886666
phoneTools.addPrefix('978886666', '14'); // Returns 14978886666
phoneTools.addPrefix('19788', '1', 5); // Returns 19788
phoneTools.addPrefix('9788', '1', 5); // Returns 19788
```

### Verify if its a valid or invalid phone number

Input: String Phone

```javascript
import { phoneTools } from 'prettyutils';

phoneTools.validate('+56 9 7888 6666'); // Returns true
phoneTools.validate('56978886666'); // Returns true
phoneTools.validate('978886666'); // Returns true
phoneTools.validate('123456'); // Returns false
```

## Test

```
npm test
```

## Credits

- [Cesar Villalobos](https://www.cesar.cl)

## License

- [GPL-3.0-or-later](https://github.com/cesar-villalobos/prettyutil/blob/main/LICENSE)
