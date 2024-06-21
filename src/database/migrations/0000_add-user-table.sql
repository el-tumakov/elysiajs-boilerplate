CREATE TABLE IF NOT EXISTS "user" (
	"id" char(26) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone,
	"email" text NOT NULL,
	"password" text,
	"name" text
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_email_index" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_name_index" ON "user" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_deleted_at_index" ON "user" USING btree ("deleted_at");