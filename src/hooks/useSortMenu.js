export default function useSortMenu() {
    // Sorting function
    const sortByKey = (items, key, direction) => {
        const shallowItems = [...items];
        if (!shallowItems || shallowItems.length === 0) {
            return [];
        }

        return shallowItems.sort((a, b) => {
            if (direction === 'asc') {
                return a[key] > b[key] ? 1 : -1;
            } else {
                return a[key] < b[key] ? 1 : -1;
            }
        });
    };

    // Filter by price range
    const filterByPrice = (items, minPrice, maxPrice) => {
        return items.filter(item => {
            return item.defaultPrice >= minPrice && item.defaultPrice <= maxPrice;
        });
    };


    // Filter by rating
    const filterByRating = (items, selectedRatings) => {
        if (!selectedRatings || selectedRatings.length === 0) {
            return items; 
        }
        
        return items.filter(item => {
            const rating = item.rating || 0;
            // Check if rating matches any selected rating
            return selectedRatings.some(selectedRating => {
                if (selectedRating === '4+') {
                    return rating >= 4;
                } else {
                    return rating === parseFloat(selectedRating);
                }
            });
        });
    };

    // Combined filter function
    const applyFilters = (items, filters) => {
        let filteredItems = [...items];
        // Apply price filter
        if (filters.priceRange) {
            const [minPrice, maxPrice] = filters.priceRange;
            filteredItems = filterByPrice(filteredItems, minPrice, maxPrice);
        }
        // Apply rating filter
        if (filters.ratings && filters.ratings.length > 0) {
            filteredItems = filterByRating(filteredItems, filters.ratings);
        }
        return filteredItems;
    };



    return {
        sortByKey,
        filterByPrice,
        filterByRating,
        applyFilters,
    };
}