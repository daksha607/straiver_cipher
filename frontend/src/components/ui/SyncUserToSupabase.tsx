import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";

function SyncUserToSupabase() {
  const { user } = useUser();

  useEffect(() => {
    const insertUser = async () => {
      if (!user) return;

      const { error } = await supabase
        .from("users")
        .upsert([
          {
            id: user.id,
            email: user.primaryEmailAddress?.emailAddress,
            // Add other fields only if they exist in your Supabase DB schema
            name: user.fullName, // Ensure 'name' column exists in Supabase!
          },
        ]);

      if (error) {
        console.error("Supabase insert error:", error.message);
      }
    };

    insertUser();
  }, [user]);

  return null;
}

export default SyncUserToSupabase;


