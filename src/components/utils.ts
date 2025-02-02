export function formatMoney(amount: number): string {
    const  fixedAmount = amount.toFixed(2);
    const  formattedAmount = fixedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `$${formattedAmount}`;
}