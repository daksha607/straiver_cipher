import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { supabase } from "@/lib/supabase";

function SyncUserToSupabase() {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      const insertUser = async () => {
        const { data, error } = await supabase
          .from("users")
          .upsert([
            {
              id: user.id,
              email: user.primaryEmailAddress?.emailAddress,
              name: user.fullName,
            },
          ]);

        if (error) {
          console.error("Supabase insert error:", error.message);
        } else {
          console.log("User synced to Supabase:", data);
        }
      };

      insertUser();
    }
  }, [user]);

  return null;
}

export default SyncUserToSupabase;

