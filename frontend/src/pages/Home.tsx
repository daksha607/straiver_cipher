import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { supabase } from '@/lib/supabase'

function Profile() {
  const { user } = useUser()

  useEffect(() => {
    const syncUser = async () => {
      if (user) {
        const { error } = await supabase
          .from('users')
          .upsert([{ id: user.id, email: user.primaryEmailAddress?.emailAddress }])

        if (error) console.error(error)
      }
    }

    syncUser()
  }, [user])

  return <div className="text-white p-4">Welcome, {user?.fullName}!</div>
}

export default Profile

