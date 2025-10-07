import React, { useState, useEffect } from 'react';
import { SortingButton } from '@/components/SortingButton/SortingButton';
import styles from './HomePage.module.css';
import { useGetDrinksListQuery } from '@/redux/DrinksApi';
import SearchBar from '@/components/searchbar/SearchBar';
import LocationTextBox from '@/components/choose-location/LocationTextBox';
import { FiLoader } from 'react-icons/fi';
import WithNavbar from '@/components/HOC/WithNavbar';
import ProductsGrid from '@/components/ProductCards/ProductsGrid';
import Filteration from '@/components/categoryBar/Filteration';
import PromotionalCard from '@/components/PromotionalCard/PromotionalCard';
import ReactPaginate from 'react-paginate';


import UseListingManipulator from '@/hooks/useListingManipulator';

function HomePage() {
    const SORTING_OPTIONS = [
        { label: 'Price: Low to High', sortKey: 'defaultPrice', sortDir: 'asc' },
        { label: 'Price: High to Low', sortKey: 'defaultPrice', sortDir: 'desc' },
        { label: 'Rating: Low to High', sortKey: 'rating', sortDir: 'asc' },
        { label: 'Rating: High to Low', sortKey: 'rating', sortDir: 'desc' }
    ]

    const [currentItems, setCurrentItems] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 16;
    const [priceRange, setPriceRange] = useState([0, 2000]);

    const {data, error, isLoading} = useGetDrinksListQuery();
    const { items, handleCateoryFilter, handleItemFiltering, handleItemsSorting } = UseListingManipulator(data);

    useEffect(() => {
        if(!items) return;
        if(items.length < itemsPerPage) {
            setCurrentItems(items);
            setPageCount(1);
            setCurrentPage(0);
        } else {
            const newOffset =  ((currentPage + 1) * itemsPerPage );
            setCurrentItems(items.slice(newOffset, newOffset + itemsPerPage));
            setPageCount(Math.ceil(items.length / itemsPerPage));
        }
        
    }, [currentPage, items]);

    useEffect(() => {
        if(!data) return;
        const {min, max} = data.reduce((acc, item) => {
            const price = parseFloat(item.defaultPrice) || 0;
                return {
                    min: Math.min(acc.min, price),
                    max: Math.max(acc.max, price)
                };
            }, {min: Infinity, max: -Infinity});
        
            setPriceRange([min, max]);
    }, [data]);
    
    function handlePageClick(event) {
        setCurrentPage(event.selected);
    }

    if (isLoading) {
        return (
            <div className={styles.loading_container}>
                <FiLoader className={styles.loader_icon} />
                <span>Loading...</span>
            </div>
        );
    }

    return (
        <div className={styles.home_container}>
            <div className={styles.home_upper_section}>
                <div className={styles.upper_section_container}>
                    <LocationTextBox />
                    <div className={styles.horizontal_flex}>
                        <div className={styles.flex_auto}>
                            <SearchBar drinksList={data} />
                        </div>
                        {priceRange && <SortingButton
                            sortOptions={SORTING_OPTIONS}
                            onSortClickEvent={(option) => handleItemsSorting(option)}
                            onFilterClickEvent={(filters) => handleItemFiltering(filters)}
                            IsEnabled={!isLoading}
                            priceRanges={priceRange}
                        />}
                    </div>
                </div>
                <div className={styles.upper_section_container + " " + styles.promo_card_container}>
                    <PromotionalCard />
                </div>
            </div>
            <div style={{width: "100%"}}>
                <Filteration productsList={data || []} setDetails={(details) => handleCateoryFilter(details)}/>
                <ProductsGrid products={currentItems} loading={isLoading} errorMsg={error?.data?.message || error?.error} />
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="›"
                    previousLabel="‹"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={pageCount}
                    containerClassName={styles.pagination}
                    pageClassName={styles.pageItem}
                    forcePage={currentPage}
                    pageLinkClassName={styles.pageLink}
                    activeClassName={styles.active}
                    previousClassName={styles.pageItem}
                    nextClassName={styles.pageItem}
                    breakClassName={styles.pageItem}
                ></ReactPaginate>
            </div>

        </div>
        )
}

export default WithNavbar(HomePage);
