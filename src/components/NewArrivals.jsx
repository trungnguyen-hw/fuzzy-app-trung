import ProductCard from './ProductCard';

export default function NewArrivals() {
  return (
    <section className="section-t-space">
      <div className="custom-container">
        <div className="title">
          <h2>New Arrivals</h2>
          <a href="shop.html">View All</a>
        </div>

        <div className="row g-3">
          <div className="col-6">
            <ProductCard
              img="/assets/images/product/1.png"
              title="Buddy Chair"
              subtitle="Modern saddle arms"
              price="$14"
              oldPrice="$20"
              rating="4.5"
              initialLiked={true}
            />
          </div>
          <div className="col-6">
            <ProductCard
              img="/assets/images/product/2.png"
              title="Wingback Chair"
              subtitle="Modern saddle arms"
              price="$14"
              oldPrice="$20"
              rating="4.5"
              initialLiked={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
