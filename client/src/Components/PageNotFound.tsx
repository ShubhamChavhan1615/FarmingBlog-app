
import { Link } from 'react-router-dom';
function PageNotFound() {
  return (
    <section className="page_404 bg-white py-10 font-serif">
      <div className="container">
        <div className="row"> 
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg bg-center h-96" style={{backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)'}}>
                <h1 className="text-center text-6xl">404</h1>
              </div>
        
              <div className="contant_box_404 mt-10">
                <h3 className="text-6xl">Look like you're lost</h3>
                <p className="text-xl">the page you are looking for is not available!</p>
                <Link to={"/"} className="link_404 inline-block px-8 py-4 bg-green-500 text-white mt-4">Go to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageNotFound;
