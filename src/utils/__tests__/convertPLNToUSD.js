import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });
 
  it ('should return NaN when input is text', () => {
    expect(convertPLNToUSD('6')).toBeNaN();
    expect(convertPLNToUSD('a')).toBeNaN();
    expect(convertPLNToUSD('Ala')).toBeNaN();
    expect(convertPLNToUSD('-34')).toBeNaN();
  });

  it ('should return NaN when input is empty', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return "Error" when input is different than number and string', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  });

  it ('should return 0 when value is negative', () => {
     expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-2.5)).toBe('$0.00');
    expect(convertPLNToUSD(-56)).toBe('$0.00');
  })
});