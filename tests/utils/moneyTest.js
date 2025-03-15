import { formatCurrency } from "../../utils/money.js";

// Suite case
describe('Test Suite: formatCurrency', () => {

  // Teste Case
  it('Testing Coverting of cents into dollars', () => {
    expect(formatCurrency(1212)).toEqual('12.12');
  });

  it('Works With Zero', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Rounds up positive real value with end .5', () => {
    expect(formatCurrency(2222.5)).toEqual('22.23');
  });

  it('Rounds up positive real value with end .6', () =>{
    expect(formatCurrency(2222.6)).toEqual('22.23');
  });

  it('Rounds down positive value with end .4', () => {
    expect(formatCurrency(2222.4)).toEqual('22.22');
  });

  it('Rounds down negative value with end .5', () => {
    expect(formatCurrency(-2222.5)).toEqual('-22.22');
  });

  it('Rounds down negative value with end .4', () => {
    expect(formatCurrency(-2222.4)).toEqual('-22.22');
  });

  it('Rounds up negative value with end .6', () => {
    expect(formatCurrency(-2222.6)).toEqual('-22.23');
  });

});

