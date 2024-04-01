function formatPrice(price: string | undefined): string {
    if (typeof price === 'string') {
        const priceNumber = parseFloat(price);
        if (!isNaN(priceNumber)) {
            return `$${priceNumber.toFixed(0)}`;
        }
    }
    return '';
}

export default formatPrice;