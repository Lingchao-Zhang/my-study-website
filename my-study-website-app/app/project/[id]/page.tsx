import { Modal, RelatedProjects } from "@/components"
import ProjectActions from "@/components/ProjectActions"
import { getProjectById } from "@/lib/actions"
import { ParamsType, ProjectInterface } from "@/types"
import { createQueryString } from "@/utils"
import Image from "next/image"
import Link from "next/link"

const ProjectById = async ({ params: { id }, searchParams: { session }}: ParamsType) => {
    const result = await getProjectById(id) as { project?: ProjectInterface }
    const project = result.project ? result.project : undefined
    const userSession = session ? JSON.parse(session) : {}
    const userProfileLink = `../profile/${project?.createdBy.id}?${createQueryString('session', session)}`
    return(
        project ?
            <Modal>
                <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                    <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                        <Link href={userProfileLink}>
                            <Image 
                            src={project.createdBy.avatarUrl}
                            width={26}
                            height={24}
                            alt="user avatar"
                            />
                        </Link>
                        <div className="flex-1 flexStart flex-col gap-1">
                            <p className="self-start text-lg font-semibold">
                                {project.title}
                            </p>
                            <div className="user-info">
                                <Link href={userProfileLink}>
                                    {project.createdBy.name}
                                </Link>
                                <Image src="/dot.svg" width={4} height={4} alt="dot" />
                                <Link href={`/?category=${project.category}&${createQueryString('session', session)}`} className="text-primary-purple font-semibold"> 
                                        {project.category}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {
                        userSession.user && (userSession.user.id === project.createdBy.id) ? 
                        <ProjectActions 
                        projectId={project.id}
                        currentUser={userSession}/>
                        :
                        <></>
                    }
                </section>
                <section className="mt-14">
                    <Image 
                        className="object-cover rounded-2xl"
                        src={project.image}
                        width={1064}
                        height={800}
                        alt="project poster"
                        />
                </section>
                <section className="flexCenter flex-col mt-20">
                    <p className="max-w-5xl text-xl font-normal">
                        {project.description}
                    </p>
                    <div className="flex flex-wrap mt-5 gap-5">
                        <Link href={project.githubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                            🖥 <span className="underline">Github</span> 
                        </Link>
                        <Image src="/dot.svg" width={4} height={4} alt="dot" />
                        <Link href={project.liveSiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                            🚀 <span className="underline">Live Site</span> 
                        </Link>
                    </div>
                </section>

                <section className="flexCenter w-full gap-8 mt-28">
                    <span className="w-full h-0.5 bg-light-white-200" />
                    <Link href={userProfileLink} className="min-w-[82px] h-[82px]">
                        <Image
                            src={project.createdBy.avatarUrl}
                            className="rounded-full"
                            width={82}
                            height={82}
                            alt="profile image"
                        />
                    </Link>
                    <span className="w-full h-0.5 bg-light-white-200" />
                </section>
                
                <RelatedProjects 
                 userId={project.createdBy.id}
                 projectId={project.id}
                 userSession={userSession}/>
            </Modal>
            :
            <p className="no-result">Failed to fetch the project info</p>
    )
}

export default ProjectById