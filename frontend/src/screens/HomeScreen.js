import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' // use selector is used for selected part of the state or for fetching data from DB
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = ({ match }) => {

    const { keyword } = useParams()
    const { pageNumber } = useParams() || 1


    // const keyword = id
    // console.log(keyword);
    // console.log(pageNumber);

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, products, error, page, pages } = productList

    useEffect(() => {
        // const fetchProducts = async () => {
        // const res = await axios.get('/api/products'); // res comes with default attribute called data we can use destructure like instead of sending getting res we can do as follows
        //     const { data } = await axios.get('/api/products')
        //     setProducts(data)
        // }
        // fetchProducts();

        dispatch(listProducts(keyword, pageNumber))

    }, [dispatch, keyword, pageNumber]) // this empty array denotes that if we add any attribute to that it behave as a dependency, and if that attribute changes sometime then useEffect will activate


    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Product</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {
                            products.map(product => {
                                return (
                                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                        <Product product={product} />
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )
            }

        </>
    )
}

export default HomeScreen
