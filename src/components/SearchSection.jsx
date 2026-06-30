import Iconsax from './Iconsax';

export default function SearchSection() {
  return (
    <section>
      <div className="custom-container">
        <form className="theme-form search-head" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <div className="form-input">
              <input type="text" className="form-control search" id="inputusername" placeholder="Search here..." />
              <Iconsax className="search-icon" icon="search-normal-2" />
            </div>

            <a href="#search-filter" className="btn filter-btn mt-0" data-bs-toggle="modal">
              <Iconsax className="filter-icon" icon="media-sliders-3" />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
}
