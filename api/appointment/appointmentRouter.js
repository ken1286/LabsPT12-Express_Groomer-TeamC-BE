const router = require('express').Router();
const authRequired = require('./../middleware/authRequired');
const AppointController = require('./appointmentController');

/**
 * @swagger
 * components:
 *  schemas:
 *      Appointment:
 *          type: object
 *          required:
 *              - client_id
 *              - groomer_id
 *              - animal_id
 *              - appointment_date
 *              - location
 *              - services
 *          properties:
 *              client_id:
 *                  type: string
 *                  description: Should be the same with the animal owner_id from /appointments
 *              groomer_id:
 *                  type: string
 *                  description: The groomer profile id
 *              services:
 *                  type: array
 *                  items: {
 *                    type: string
 *                  }
 *              animal_id:
 *                  type: string
 *              appointment_date:
 *                  type: date-time
 *                  description: The date-time format should look like 2018-11-13T20:20:39+00:00
 *              location:
 *                  type: string
 *          example:
 *              client_id: 'user7_id'
 *              groomer_id: '00ulthapbErVUwVJy4x6'
 *              animal_id: 'animal1_id'
 *              appointment_date: '2020-11-18T08:20:00+00:00'
 *              location: 'Mebane NC'
 *              services: [
 *                  'service2_id',
 *                    'service3_id',
 *                    'service4_id'
 *                ]
 *  parameters:
 *      appointmentId:
 *          name: id
 *          in: path
 *          description: ID of the appointment
 *          required: true
 *          example: 750dd31c-9d2f-48c0-b5ca-a8d487863456
 *          schema:
 *              type: string
 *
 *
 * /appointments/schedule:
 *  post:
 *      summary: Make an appointment
 *      security:
 *          - okta: []
 *      tags:
 *          - appointment
 *      requestBody:
 *          description: Appointment to be added
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Appointment'
 *      responses:
 *          400:
 *              $ref: '#/components/responses/BadRequest'
 *          401:
 *              $ref: '#/components/responses/UnauthorizedError'
 *          404:
 *              description: 'Appointment not found'
 *          200:
 *              description: A appointment object
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: A message about the result
 *                                  example: appointment created
 *                              result:
 *                                  $ref: '#/components/schemas/Animal'
 */
router.post(
  '/schedule',
  authRequired,
  AppointController.post.bind(AppointController)
);

/**
 * @swagger
 * /appointments/{id}:
 *  delete:
 *    summary: Cancel an appointment
 *    security:
 *      - okta: []
 *    tags:
 *      - appointment
 *    parameters:
 *      - $ref: '#/components/parameters/appointmentId'
 *    responses:
 *      401:
 *        $ref: '#/components/responses/UnauthorizedError'
 *      404:
 *        $ref: '#/components/responses/NotFound'
 *      200:
 *        description: A appointment object
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: A message about the result
 *                  example: Appointment '750dd31c-9d2f-48c0-b5ca-a8d487863456' was canceled.
 *                appointment:
 *                  $ref: '#/components/schemas/Appointment'
 */
router.delete(
  '/:id/cancel',
  authRequired,
  AppointController.del.bind(AppointController)
);

module.exports = router;
