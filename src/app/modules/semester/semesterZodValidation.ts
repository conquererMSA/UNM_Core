import z from 'zod';
export const create = z.object({
  body: z.object({
    semesterData: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      code: z.string({
        required_error: 'Code is required',
      }),
      year: z.number({
        required_error: 'Year is required',
      }),
      startMonth: z.string({
        required_error: 'Start moth is required',
      }),
      endMonth: z.string({
        required_error: 'End month is required',
      }),
    }),
  }),
});
