import { body } from 'express-validator';

export const packageValidator = [
  body('name').notEmpty().withMessage('Package name is required'),
  body('vehicle').isIn(['12-seater hiace', '15-seater hiace', '29-seater coaster']).withMessage('Invalid vehicle type'),
  body('locations').isArray({ min: 3, max: 8 }).withMessage('Locations must be between 3 and 8'),
  body('days').isInt({ min: 1 }).withMessage('Number of days must be at least 1'),
  body('description').notEmpty().withMessage('Description is required'),
  body('facilities').isArray({ max: 10 }).withMessage('Facilities can have a maximum of 10 items'),
  body('images').isArray({ max: 5 }).withMessage('A maximum of 5 images are allowed'),
  body('pricePerPerson').isFloat({ gt: 0 }).withMessage('Price per person must be a positive number'),
  body('date').isISO8601().toDate().withMessage('Date must be a valid ISO8601 format'),
];
