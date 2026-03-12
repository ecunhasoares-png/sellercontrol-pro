export function calculateProfit(
  marketplace: string,
  price: number,
  cost: number,
  shipping: number
) {

  let fee = 0

  if (marketplace === 'Shopee') {
    fee = price * 0.14
  }

  if (marketplace === 'MercadoLivre') {
    fee = price * 0.16
  }

  if (marketplace === 'Amazon') {
    fee = price * 0.15
  }

  const profit = price - cost - shipping - fee

  return {
    fee,
    profit
  }
}