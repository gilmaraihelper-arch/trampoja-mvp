ALTER TABLE `invites` ADD `expires_at` integer NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `invites_shift_freelancer_uniq` ON `invites` (`shift_id`,`freelancer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_restaurant_freelancer_uniq` ON `favorites` (`restaurant_id`,`freelancer_id`);