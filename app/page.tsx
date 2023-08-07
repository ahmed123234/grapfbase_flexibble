import { ProjectInterface } from "@/common.types";
import { Categories, LoadMore, ProjectCard } from "@/components";
import { fetchAllProjects } from "@/lib/actions";
type ProjectSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface
    }[]
    pageInfo: {
      hasPreviousPage: boolean,
      hasNextPage: boolean,
      startCursor: string,
      endCursor: string 
    }
  }
}

type SearchParams = {
  category?: string
  endcursor?: string
}

type props = { 
  searchParams: SearchParams
}

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: {category, endcursor}}: props) => {
  console.log(endcursor);
  
  const data = await fetchAllProjects(category, endcursor) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges || [];

  const pagination = data?.projectSearch?.pageInfo

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart paddings flex-col">
        <Categories />

        <p className="no-result-text text-center">No projects found, go create some first</p>
      </section>
    )
  }
   
  return (
    <section className="flex-start flex-col paddings mb-16">
     <Categories />
     {/* <h1> Posts</h1> set all the posts */}
     <section className="projects-grid">
        {projectsToDisplay.map(({node}: {node: ProjectInterface}) =>(
          <ProjectCard 
            key={node?.id}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy?.name}
            avatarUrl={node?.createdBy?.avatarUrl}
            userId={node?.createdBy?.id}
          />
        ))}
     </section>

      <LoadMore 
        // start cursor in graphql is just a link to the starting position of the data 
        startCursor={pagination.startCursor}
        endCursor={pagination.endCursor}
        hasPreviousPage={pagination.hasPreviousPage}
        hasNextPage={pagination.hasNextPage}

      />
    </section>
  )
}

export default Home;