import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { Modal, ProjectForm } from ".";
import { ProjectInterface } from "@/common.types";

type props = {
    type: 'create' | 'edit',
    action: string
    project?: ProjectInterface
}

const Action = async ({ type, action, project }: props) => {
    const session = await  getCurrentUser();
    // if there is no session specified for the current user then go back to the main page 
    if(!session?.user) {
      // this is an alternative to the useRouter definec just for client side components, which used in server side components
      redirect('/');
    }
    return (
      <Modal>
        <h3 className='modal-head-text'>{action}</h3>
        <ProjectForm type={type} session={session} project={project}/>
      </Modal>
    )
}

export default Action