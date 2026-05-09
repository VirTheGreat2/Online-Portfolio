import { createServerSideClient } from "@/lib/supabase-server";

export async function checkAdmin() {
  const supabase = await createServerSideClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return false;
  }

  return true;
}
