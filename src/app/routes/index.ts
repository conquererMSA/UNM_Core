import express from 'express';
import semesterRoute from '../modules/semester/semesterRoute';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/semester',
    route: semesterRoute,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
