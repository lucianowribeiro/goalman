ALTER TABLE "goals_compleations" RENAME TO "goals_completations";--> statement-breakpoint
ALTER TABLE "goals_completations" DROP CONSTRAINT "goals_compleations_goal_id_goals_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "goals_completations" ADD CONSTRAINT "goals_completations_goal_id_goals_id_fk" FOREIGN KEY ("goal_id") REFERENCES "public"."goals"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
