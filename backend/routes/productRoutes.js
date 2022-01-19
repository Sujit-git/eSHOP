import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductsById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.get('/top', getTopProducts)
router
    .route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router
    .route('/:id')
    .get(getProductsById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

router
    .route('/:id/reviews').post(protect, createProductReview)

export default router;

