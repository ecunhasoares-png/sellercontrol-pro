export function calculateProfit(
marketplace:string,
price:number,
cost:number,
shipping:number
){

let fee = 0

if(marketplace === 'Shopee') fee = price * 0.14
if(marketplace === 'MercadoLivre') fee = price * 0.16
if(marketplace === 'Amazon') fee = price * 0.18

const profit = price - cost - shipping - fee

const margin = price > 0 ? (profit / price) * 100 : 0

return {
profit,
margin
}

}