CREATE TABLE "chapters" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"chapter_order" integer NOT NULL,
	"content" text NOT NULL,
	"summary" text NOT NULL,
	"keyword" text,
	"theme" text,
	"cover_image" text,
	"reading_time" integer NOT NULL,
	"published_at" timestamp with time zone NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL
);
