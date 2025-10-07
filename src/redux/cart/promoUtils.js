import { getUnitPrice } from './selectors';

export const applyPromotionToCart = (cartItems, promo) => {
  const itemsArray = Object.values(cartItems);
  let error = null;
  let discount = 0;
  let newTotal = 0;

  switch (promo?.type) {
    case 'bogo': {
      const total = itemsArray.reduce((sum, item) => {
        const price =
          item.product.sizes.find((s) => s.name === item.size)?.price ||
          item.product.defaultPrice;
        return sum + item.quantity * price;
      }, 0);

      const bogoItems = itemsArray.filter((item) =>
        item.product.category.toLowerCase().includes(promo.value.toLowerCase())
      );
      const totalQty = bogoItems.reduce((sum, item) => sum + item.quantity, 0);
      if (totalQty >= 2) {
        discount =
          bogoItems.reduce(
            (prev, item) =>
              item.quantity >= 2
                ? prev + getUnitPrice(item.product, item.size)
                : prev,
            0
          ) ?? 0;
        newTotal = total - discount;
      } else {
        newTotal = total;
      }
      break;
    }

    case 'percentage_off': {
      const total = itemsArray.reduce((sum, item) => {
        const price =
          item.product.sizes.find((s) => s.name === item.size)?.price ||
          item.product.defaultPrice;
        return sum + item.quantity * price;
      }, 0);
      discount = total * promo.value;
      newTotal = total - discount;
      break;
    }

    default:
      error = 'Unknown promotion type.';
  }

  return { discount, newTotal, error };
};
