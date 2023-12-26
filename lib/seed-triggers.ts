import postgres from "postgres"
import "dotenv/config"

const dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
  throw new Error("The DATABASE_URL environment variable must be set")
}

const sql = postgres(dbUrl)

async function main() {
  await sql`
    CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO public.profile (id)
      VALUES (new.id);
      RETURN new;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  await sql`
    CREATE OR REPLACE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  `;
  await sql`
    CREATE OR REPLACE FUNCTION public.handle_user_delete()
    RETURNS trigger AS $$
    BEGIN
      DELETE FROM auth.users WHERE id = old.id;
      RETURN old;
    END;
    $$ LANGUAGE plpgsql SECURITY DEFINER;
  `;
  await sql`
    CREATE OR REPLACE TRIGGER on_profile_user_deleted
      AFTER DELETE ON public.profile
      FOR EACH ROW EXECUTE PROCEDURE public.handle_user_delete();
  `;
  console.log("Finished adding triggers and functions for profile handling.");
  process.exit();
}

main();