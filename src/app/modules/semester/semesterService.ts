import { AcademicSemester, Prisma, PrismaClient } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { paginationHelpers } from '../../../helpers/paginationHelper';
const prisma = new PrismaClient();

export const createSemesterService = async (
  semester: AcademicSemester
): Promise<AcademicSemester> => {
  const createdSemester = await prisma.academicSemester.create({
    data: semester,
  });
  return createdSemester;
};

export type IFilterRequest = {
  searchTerm?: string;
};

const searchAbleFields = ['title', 'code', 'year', 'startMonth', 'endMonth'];
export const getAllSemesterService = async (
  pagination: IPaginationOptions,
  filters: IFilterRequest
): Promise<IGenericResponse<AcademicSemester[]>> => {
  const { searchTerm, ...filtersData } = filters;
  console.log('srachTerm', searchTerm);

  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  //   console.log(pagination);
  const andCondition = [];
  //   console.log(`pagination ${pagination} \n filters ${filters}`);

  //dynamic searching on all searc able fields
  if (searchTerm) {
    andCondition.push({
      OR: searchAbleFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  //dynamic filtering specific query field

  if (Object.keys(filtersData).length > 0) {
    andCondition.push({
      AND: Object.keys(filtersData).map(key => ({
        [key]: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          equals: (filtersData as any)[key],
        },
      })),
    });
  }
  const whereCondition: Prisma.AcademicSemesterWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  //ekadik database/table operation eksathe resolve korar jonno transaction use kora zay
  const semesters = await prisma.academicSemester.findMany({
    where: whereCondition,
    orderBy: {
      [sortBy]: sortOrder,
    },
    //pagination
    skip,
    take: limit,
  });
  const total = await prisma.academicSemester.count();

  return {
    meta: {
      limit,
      page,
      total,
    },
    data: semesters,
  };
};
