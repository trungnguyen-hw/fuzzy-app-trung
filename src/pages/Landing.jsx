import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import SearchSection from '../components/SearchSection';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import NewArrivals from '../components/NewArrivals';
import TrendingFurniture from '../components/TrendingFurniture';
import OfferZone from '../components/OfferZone';
import FurnitureAndDecor from '../components/FurnitureAndDecor';
import GridBanner from '../components/GridBanner';
import FilterModal from '../components/FilterModal';
import BottomNav from '../components/BottomNav';

export default function Landing() {
  useEffect(() => {
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    const handleInputChange = (e) => {
      let target = e.target;
      const min = target.min || 0;
      const max = target.max || 100;
      const val = target.value;
      target.style.backgroundSize = ((val - min) * 100) / (max - min) + '% 100%';
    };
    rangeInputs.forEach((input) => {
      input.addEventListener('input', handleInputChange);
    });

    return () => {
      rangeInputs.forEach((input) => {
        input.removeEventListener('input', handleInputChange);
      });
    };
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
      <SearchSection />
      <Banner image="/assets/images/banner/banner-1.jpg" imgClass="img-fluid img-bg w-100" />
      <Categories />
      <NewArrivals />
      <TrendingFurniture />
      <Banner image="/assets/images/banner/banner-2.jpg" imgClass="img-fluid img-bg" />
      <OfferZone />
      <FurnitureAndDecor />
      <GridBanner />
      <FilterModal />
      <section className="panel-space"></section>
      <BottomNav />
    </>
  );
}
