# Safargo API Summary

Base URL: `/api/v1`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `GET /auth/me`

## Users

- `GET /users` admin only
- `GET /users/:id`
- `PATCH /users/me/profile`

## Trips

- `GET /trips`
- `POST /trips`
- `GET /trips/:id`
- `PATCH /trips/:id`
- `DELETE /trips/:id`

## Bookings

- `GET /bookings`
- `POST /bookings`
- `PATCH /bookings/:id`
- `DELETE /bookings/:id`

## Notifications

- `GET /notifications`
- `POST /notifications` admin only
- `PATCH /notifications/read-all`
- `PATCH /notifications/:id/read`

## Analytics

- `POST /analytics/events`
- `GET /analytics/overview`

## AI

- `GET /ai/conversations`
- `POST /ai/itinerary`
- `POST /ai/recommendations`
- `POST /ai/budget`
- `POST /ai/packing-list`
- `POST /ai/chat`

Swagger UI is available at `/api-docs`.
