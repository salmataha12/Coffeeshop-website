export default function getPriceRange(sizes) {
  let minValue = sizes[0].price;
  let maxValue = sizes[0].price;

  sizes.forEach((size) => {
    if (size.price < minValue) minValue = size.price;
    else if (size.price > maxValue) maxValue = size.price;
  });

  return { maxValue: maxValue, minValue: minValue };
}
