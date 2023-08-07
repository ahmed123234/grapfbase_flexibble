import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getProjectDetails } from "@/lib/actions"

// import ProjectActions from "@/components/ProjectActions"
// import RelatedProjects from "@/components/RelatedProjects"
import { ProjectInterface } from "@/common.types"
import { Modal, ProjectActions, RelatedProjects } from "@/components"

const LinkElement = ({ href, title, src }: { href: string, title: string, src: string }) => (
    <div className="flexCenter gap-3">
      <span>{src}</span>
      <Link href={href} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
        <span className="underline">{title}</span> 
      </Link>
    </div>
  )

const Project = async ({ params: { id } }: { params: { id: string } }) => {
    const session = await getCurrentUser()
    const result = await getProjectDetails(id) as { project?: ProjectInterface}

    if (!result?.project) return (
        <p className="no-result-text">Failed to fetch project info</p>
    )

    const projectDetails = result?.project

    const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`

    return (
        <Modal>
            <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    <Link href={renderLink()}>
                        <Image
                            src={projectDetails?.createdBy?.avatarUrl}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {projectDetails?.title}
                        </p>
                        <div className="user-info">
                            <Link href={renderLink()}>
                                {projectDetails?.createdBy?.name}
                            </Link>
                            <Image src="/dot.svg" width={4} height={4} alt="dot" />
                            <Link href={`/?category=${projectDetails.category}`} className="text-primary-purple font-semibold"> 
                                {projectDetails?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === projectDetails?.createdBy?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={projectDetails?.id} />
                    </div>
                )}
            </section>

            <section className="mt-14">
                <Image
                    src={`${projectDetails?.image}`}
                    className="object-cover rounded-2xl"
                    width={1064}
                    height={798}
                    alt="poster"
                />
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {projectDetails?.description}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <LinkElement  href={projectDetails?.githubUrl} title="GitHub" src="🖥"/> 

                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    
                    <LinkElement  href={projectDetails?.liveSiteUrl} title="Live Site" src="🚀"/>

                </div>
            </section>
      
            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={projectDetails?.createdBy?.avatarUrl}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedProjects userId={projectDetails?.createdBy?.id} projectId={projectDetails?.id} />
        </Modal>
    )
}

export default Project
























// // "use client";
// import { ProjectInterface } from "@/common.types";
// import { getProjectDetails } from "@/lib/actions";
// import Image from "next/image";
// import Link from "next/link";
// // import { useRouter, useParams } from "next/navigation"

// const LinkElement = ({ href, title, src }: { href: string, title: string, src: string }) => (
//   <div className="flexCenter gap-3">
//     <Image src={src}  alt="" width={20} height={12}/>
//     <Link href={href} className="underline text-purple-800">{title}</Link>
//   </div>
// )
// const Project = async ({ params: { id } }: { params: { id: string }}) => {
//     // const { id } = useParams();
//     const data = await getProjectDetails(id as string) as {
//       project: ProjectInterface
//     };

//     if(!data?.project) {
//       <p>Failed to fetch project information</p>
//     }
//     const project: ProjectInterface = data?.project
    
//     // console.log(data?.project);
    
//   return (
//     <div className="mx-8 my-10">
//       <div className="flex mx-8 my-10 gap-7 items-center">
//         <Image className=" rounded-full" src={project?.createdBy?.avatarUrl} alt="avatar" width={50} height={50}/>

//         <div className="flex flex-col gap-4 ">
//           <p>{project?.title}</p>
//           <div className="flexBetween  gap-8">
//             <span>{project?.createdBy?.name}</span>
//             <span>{project?.category}</span>
//           </div>
//         </div>
//       </div>

//       <div className=" w-full h-full my-10 flexCenter ">
//         <Image src={project?.image}  alt="" width={300} height={300} className=" object-cover w-11/12 h-1/4"/>
//       </div>

//       <div className="flex-col flexCenter gap-5">
//         <p>{project?.description}</p>
//         <div className="flexCenter gap-8">
//           <LinkElement  href={project?.githubUrl} title="GitHub" src=""/>
//           <LinkElement  href={project?.liveSiteUrl} title="Live Site" src="/pencile.svg"/>
//         </div>
//       </div>

//       <div className="flex-center my-10">
//         <Image className=" rounded-full" src={project?.createdBy?.avatarUrl} alt="avatar" width={50} height={50}/>

//       </div>
      
//     </div>
//   )
// }

// export default Project