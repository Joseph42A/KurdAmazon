import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../component/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../actions/productActions";
import Message from "../component/Message";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Paginate from "../component/Paginate";
import ProductCarousel from "../component/ProductCarousel";
import Meta from "../component/Meta";

const HomeScreen = () => {
  // const productList = useSelector((s) => s.productList);
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // const location = useLocation();
  let { keyword, pageNumber = 1 } = useParams();

  React.useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link
          to="/"
          className="btn btn-dark"
          state={{
            border: "none",
            outline: "none",
          }}
        >
          GO BACK
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">{error} </Message>
      ) : (
        <>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
