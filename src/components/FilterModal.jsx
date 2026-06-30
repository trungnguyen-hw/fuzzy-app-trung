import Iconsax from './Iconsax';

export default function FilterModal() {
  return (
    <div className="modal search-filter" id="search-filter" tabIndex="-1">
      <div className="modal-dialog modal-fullscreen">
        <div className="modal-content">
          <div className="modal-title">
            <a href="#" data-bs-dismiss="modal">
              <Iconsax className="back-btn" icon="arrow-left" />
            </a>
            <h3 className="fw-semibold">Filter</h3>
          </div>

          <div className="tab-body d-flex align-items-start">
            <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
              <button className="nav-link active" id="v-pills-sort-tab" data-bs-toggle="pill" data-bs-target="#v-pills-sort" type="button" role="tab" aria-controls="v-pills-sort" aria-selected="true">Sort By</button>
              <button className="nav-link" id="v-pills-color-tab" data-bs-toggle="pill" data-bs-target="#v-pills-color" type="button" role="tab" aria-controls="v-pills-color" aria-selected="false">Color</button>
              <button className="nav-link" id="v-pills-price-tab" data-bs-toggle="pill" data-bs-target="#v-pills-price" type="button" role="tab" aria-controls="v-pills-price" aria-selected="false">Price</button>
              <button className="nav-link" id="v-pills-material-tab" data-bs-toggle="pill" data-bs-target="#v-pills-material" type="button" role="tab" aria-controls="v-pills-material" aria-selected="false">Material</button>
            </div>

            <div className="tab-content" id="v-pills-tabContent">
              <div className="tab-pane tab-info fade show active" id="v-pills-sort" role="tabpanel" aria-labelledby="v-pills-sort-tab" tabIndex="0">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radio1" />
                  <label className="form-check-label" htmlFor="radio1">Relevance</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radio2" />
                  <label className="form-check-label" htmlFor="radio2">Highest Priced First</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radio3" defaultChecked />
                  <label className="form-check-label" htmlFor="radio3">Lowest Priced First</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radio4" />
                  <label className="form-check-label" htmlFor="radio4">Fastest Shipping</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radio5" />
                  <label className="form-check-label" htmlFor="radio5">Newest</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="radio" id="radio6" />
                  <label className="form-check-label" htmlFor="radio6">Highest Rating First</label>
                </div>
              </div>

              <div className="tab-pane tab-info color-info fade" id="v-pills-color" role="tabpanel" aria-labelledby="v-pills-color-tab" tabIndex="0">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="" id="color1" />
                  <label className="form-check-label" htmlFor="color1">Black</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="" id="color2" />
                  <label className="form-check-label" htmlFor="color2">Gray</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="" id="color3" />
                  <label className="form-check-label" htmlFor="color3">Blue</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="" id="color4" />
                  <label className="form-check-label" htmlFor="color4">Yellow</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="" id="color5" />
                  <label className="form-check-label" htmlFor="color5">Green</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" defaultValue="" id="color6" />
                  <label className="form-check-label" htmlFor="color6">Red</label>
                </div>
              </div>

              <div className="tab-pane price-info fade" id="v-pills-price" role="tabpanel" aria-labelledby="v-pills-price-tab" tabIndex="0">
                <div className="range-slider">
                  <span>From <input type="number" defaultValue="250" min="0" max="100000" step="50" /> To <input type="number" defaultValue="750" min="0" max="1000" step="50" /> </span>
                  <input defaultValue="250" min="0" max="1000" step="50" type="range" />
                  <input defaultValue="500" min="0" max="1000" step="50" type="range" />
                  <svg width="100%" height="24">
                    <line x1="4" y1="0" x2="480" y2="0" stroke="#444" strokeWidth="12" strokeDasharray="1 28"></line>
                  </svg>
                </div>
              </div>

              <div className="tab-pane tab-info fade" id="v-pills-material" role="tabpanel" aria-labelledby="v-pills-material-tab" tabIndex="0">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="material" id="flexRadioDefault1" />
                  <label className="form-check-label" htmlFor="flexRadioDefault1">Fabric</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="material" id="flexRadioDefault2" defaultChecked />
                  <label className="form-check-label" htmlFor="flexRadioDefault2">Wooden</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="material" id="flexRadioDefault3" />
                  <label className="form-check-label" htmlFor="flexRadioDefault3">Metal</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="material" id="flexRadioDefault4" />
                  <label className="form-check-label" htmlFor="flexRadioDefault4">Plastic</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" name="material" id="flexRadioDefault5" />
                  <label className="form-check-label" htmlFor="flexRadioDefault5">Glass</label>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-modal d-flex gap-3">
            <a href="#" className="btn gray-btn btn-inline mt-0 w-50" data-bs-dismiss="modal">Clear Filter</a>
            <a href="#" className="theme-btn btn btn-inline mt-0 w-50" data-bs-dismiss="modal">apply</a>
          </div>
        </div>
      </div>
    </div>
  );
}
