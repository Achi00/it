export default function Example() {
    return (
  
        <main>
          <div>
            <div className="logo">IT.</div>
            <div>
              <h1>
                <span>Engineering</span> <span className="span1"> the Future</span>
              </h1>
              <p className="p">
              Our teams of technologists, strategists and designers deliver powerful digital experiences.
               We specialize in 11 industries in 40+ countries.
              </p>
              <div className="btn">
                  <a href="/" className="a">Home</a>
                  <a href="/contact" className="a">Contact</a>
              </div>
            </div>
          </div>
          {/* service section */}
          <section>
    <div className="services-grid">
      <div className="service service1">
        <i className="ti-bar-chart"></i>
        <h4>Engineer</h4>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, dicta!</span>
        <a href="#" className="cta">Read More</a>
      </div>
  
      <div className="service service2">
        <i className="ti-light-bulb"></i>
        <h4>Desing</h4>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, dicta!</span>
        <a href="#" className="cta">Read More </a>
      </div>
  
      <div className="service service3">
        <i className="ti-money"></i>
        <h4>Optimize</h4>
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, dicta!</span>
        <a href="#" className="cta">Read more</a>
      </div>
    </div>
  </section>
        </main>
    )
  }
  