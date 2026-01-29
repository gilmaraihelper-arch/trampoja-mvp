import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const restaurants = sqliteTable('restaurants', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  city: text('city').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const freelancers = sqliteTable('freelancers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  rating: integer('rating').notNull(), // 48 = 4.8
  reliability: integer('reliability').notNull(), // 0-100
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const shifts = sqliteTable('shifts', {
  id: text('id').primaryKey(),
  restaurantId: text('restaurant_id').notNull(),
  title: text('title').notNull(),
  neighborhood: text('neighborhood').notNull(),
  startsAt: integer('starts_at', { mode: 'timestamp' }).notNull(),
  endsAt: integer('ends_at', { mode: 'timestamp' }).notNull(),
  headcount: integer('headcount').notNull(),
  filled: integer('filled').notNull().default(0),
  status: text('status').notNull().default('open'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const favorites = sqliteTable('favorites', {
  id: text('id').primaryKey(),
  restaurantId: text('restaurant_id').notNull(),
  freelancerId: text('freelancer_id').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})

export const invites = sqliteTable('invites', {
  id: text('id').primaryKey(),
  shiftId: text('shift_id').notNull(),
  restaurantId: text('restaurant_id').notNull(),
  freelancerId: text('freelancer_id').notNull(),
  status: text('status').notNull().default('sent'), // sent|accepted|declined|expired
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
})
