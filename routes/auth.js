import express from 'express';

// middlewares
import { requiredSignin } from '../middlewares';

const router = express.Router();

// controllers
const {
  signup,
  signin,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

router.get('/', (req, res) => {
  return res.json({
    data: 'ROOT',
  });
});
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.get('/auth-check', requiredSignin, (req, res) => {
  res.json({ ok: true });
});

export default router;
