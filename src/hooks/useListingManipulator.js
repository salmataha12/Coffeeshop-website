import { useState } from "react";
import useSortMenu from "./useSortMenu";

export default function UseListingManipulator(data = []) {
    const [currentFilters, setCurrentFilters] = useState(null); //filters by price and ratings. object: {priceRanges: [], ratings: []}
    const [currentSorts, setCurrentSorts] = useState(null);     //sorts items
    const [categoryFilters, setCategoryFilters] = useState([]); //items filters by category
    const [items, setItems] = useState(data);
    const { sortByKey, filterByPrice, filterByRating } = useSortMenu();

    const applyManipulations = ({ sortingOptions = null, filteringOptions = null, filteringItems = null }) => {
        let itemsArray = [...data];

        if (filteringItems !== null) {
            itemsArray = filteringItems;
        } else if (categoryFilters.length > 0) {
            itemsArray = [...categoryFilters];
        }

        const sortToApply = sortingOptions || currentSorts;
        if (sortToApply) {
            itemsArray = sortByKey(itemsArray, sortToApply.sortKey, sortToApply.sortDir);
        }

        const filterToApply = filteringOptions || currentFilters;
        if(filterToApply) {
            if (filterToApply.priceRanges) {
                itemsArray = filterByPrice(itemsArray, filterToApply.priceRanges[0], filterToApply.priceRanges[1]);
            }
            if(filterToApply.ratings) {
                itemsArray = filterByRating(itemsArray, filterToApply.ratings);
            }
        }

        setItems(itemsArray);
    }

    const handleCateoryFilter = (filteringItems) => {
        setCategoryFilters(filteringItems);
        applyManipulations({filteringItems : filteringItems})
    }

    const handleItemsSorting = (sortingOptions) => {
        setCurrentSorts(sortingOptions);
        applyManipulations({sortingOptions : sortingOptions});
    }

    const handleItemFiltering = (filteringOptions) => {
        setCurrentFilters(filteringOptions);
        applyManipulations({filteringOptions : filteringOptions});
    }

    return { items, handleCateoryFilter, handleItemFiltering, handleItemsSorting }
}