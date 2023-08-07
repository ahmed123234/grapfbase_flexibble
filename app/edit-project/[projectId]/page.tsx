import { ProjectInterface } from '@/common.types';
import { Action } from '@/components'
import { getProjectDetails } from '@/lib/actions';
import React from 'react'

const EditProject = async ({ params }: { params: {projectId: string} }) => {

    const { projectId } = params;
    const result =  await getProjectDetails(projectId) as {
        project?: ProjectInterface
    }
  return (
    <Action type='edit'  action='Edit the Project' project={result?.project} />
  )
}

export default EditProject