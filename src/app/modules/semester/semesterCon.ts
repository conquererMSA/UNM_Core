import { RequestHandler } from 'express';
import {
  createSemesterService,
  getAllSemesterService,
} from './semesterService';
import { AcademicSemester } from '@prisma/client';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from './../../../shared/sendResponse';

export const createSemesterCon: RequestHandler = catchAsync(
  async (req, res) => {
    const createdSemester = await createSemesterService(req.body?.semesterData);
    sendResponse<AcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester created successfully',
      data: createdSemester,
    });
  }
);

export const getAllSemestersCon: RequestHandler = catchAsync(
  async (req, res) => {
    const pagination = pick(req.query, [
      'page',
      'limit',
      'sortOrder',
      'sortBy',
    ]);
    const filters = pick(req.query, [
      'searchTerm',
      'title',
      'code',
      'year',
      'startMonth',
      'endMonth',
    ]);
    const semesters = await getAllSemesterService(pagination, filters);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semesters data retrieve successfully',
      data: semesters.data,
      meta: semesters.meta,
    });
  }
);
