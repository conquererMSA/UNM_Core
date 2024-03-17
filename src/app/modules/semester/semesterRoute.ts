import express from 'express';
import { createSemesterCon, getAllSemestersCon } from './semesterCon';
import validateRequest from '../../middlewares/validateRequest';
import { create } from './semesterZodValidation';
const semesterRoute = express.Router();

semesterRoute
  .post('/create-semester', validateRequest(create), createSemesterCon)
  .get('/semesters', getAllSemestersCon);

export default semesterRoute;
