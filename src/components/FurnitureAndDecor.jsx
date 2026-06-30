import ProductCard from './ProductCard';

export default function FurnitureAndDecor() {
  return (
    <section className="section-t-space">
      <div className="custom-container">
        <div className="title">
          <h2>Furniture And Decor</h2>
          <a href="shop.html">View All</a>
        </div>

        <div className="row g-4">
          <div className="col-6">
            <ProductCard
              img="/assets/images/product/10.png"
              title="Bubble Swing Chair"
              subtitle="Modern Swing Chair"
              price="$120"
              showRating={false}
              initialLiked={true}
            />
          </div>
          <div className="col-6">
            <ProductCard
              img="/assets/images/product/11.png"
              title="Lounge Chair"
              subtitle="Modern arms chair"
              price="$120"
              showRating={false}
              initialLiked={false}
            />
          </div>
          <div className="col-6">
            <ProductCard
              img="/assets/images/product/12.png"
              title="Double Bed Sheet"
              subtitle="Modern double bed sheet"
              price="$120"
              showRating={false}
              initialLiked={false}
            />
          </div>
          <div className="col-6">
            <ProductCard
              img="/assets/images/product/13.png"
              title="Hanging Light"
              subtitle="Metal hanging light"
              price="$120"
              showRating={false}
              initialLiked={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
