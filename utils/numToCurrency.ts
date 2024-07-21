export const numToCurrency = (num: number | string) => {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(+num)
}
