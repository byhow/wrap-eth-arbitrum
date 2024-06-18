export enum ButtonText {
  ENTER_AMOUNT = "Enter Amount...",
  PLEASE_CONNECT_WALLET = "Please Connect Wallet",
  LOADING = "Loading",
  WRAP = "Wrap",
  UNWRAP = "Unwrap",
  INSUFFICIENT_BALANCE = "Insufficient Balance",
}


// TODO: since no 0x api can be used, we will hardcode the exchange rate
export const EXCHANGE_RATE = 0.9; // 1 ETH = 0.9 WETH
