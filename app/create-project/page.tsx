import { Action, Modal, ProjectForm } from '@/components'
import { getCurrentUser } from '@/lib/session'
import { redirect } from 'next/navigation';
// this component will be rendered on the top of the main page of our website 
const CreateProject = async () => (
  <Action type='create'  action='Create a New Project' />
)

export default CreateProject