import { UserProfile } from "@/common.types"
import { ProfilePage } from "@/components"
import { getUserProjects } from "@/lib/actions"


type props = {
  params: {
    id: string
  }
}

const Profile = async ({ params: { id }}: props) => {
  const result = await getUserProjects(id, 100) as { user: UserProfile };

  if(!result?.user) {
    return <p className="no-result-text">Failed to fetch user information</p>
  }
  return (
    <ProfilePage user={result?.user} />
  )
}

export default Profile