import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
 const params = useParams();
 const pageNumber = params.pageNumber || 1;

 const dispatch = useDispatch();

 const productList = useSelector((state) => state.productList);
 const { loading, error, products, page, pages } = productList;

 useEffect(() => {
  dispatch(listProducts(pageNumber));
 }, [dispatch, pageNumber]);

 return (
  <>
   <ProductCarousel />
   <h1>Latest Products</h1>
   {loading ? (
    <Loader />
   ) : error ? (
    <Message variant='danger'>{error}</Message>
   ) : (
    <>
     <Row>
      {products.map((product) => (
       <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
       </Col>
      ))}
     </Row>
     <Paginate pages={pages} page={page} />
    </>
   )}
  </>
 );
};

export default HomeScreen;
