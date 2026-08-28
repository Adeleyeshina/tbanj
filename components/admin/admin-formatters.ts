export const formatPrice = (price: number): string => {
    if (price >= 1_000_000_000) return `₦${(price / 1_000_000_000).toFixed(1)}B`
    if (price >= 1_000_000) return `₦${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)}M`
    if (price >= 1_000) return `₦${(price / 1_000).toFixed(0)}K`
    return `₦${price.toLocaleString()}`
}
