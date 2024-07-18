import { ProjectForm } from '@/common.types';
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from '@/graphql';
import { GraphQLClient } from 'graphql-request'
const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL! || '': 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY! || '': 'tamsjjdk'//it can be any kind of variable that make me able to access the grafbase  
const serverUrl = isProduction? process.env.NEXT_PUBLIC_SERVER_URL! : 'http://localhost:3000'

// client will be a connection to grafbase database
const client = new GraphQLClient(apiUrl)

const makeGraphQLRequest = async(query: string, variables: { }) => {
    try {
        // make a connection to the database by doing something like client.request
        // client.request...
        return await client.request(query, variables);
        
    } catch(err: any) {
        console.log(err.message);
        
        // throw err;
    }
}


export const getUser = async (email: string) => {
    client.setHeader('x-api-key', apiKey);
    return makeGraphQLRequest(getUserQuery, { email });
} 

export const createUser = async (name: string, email: string, avatarUrl: string) => {
    client.setHeader('x-api-key', apiKey);
    const variables = {
        input: {
            name,
            email,
            avatarUrl
        }
    }

    return makeGraphQLRequest(createUserMutation, variables);
}

export const fetchToken = async () => {
    try {
        // this api is where next-auth automatically publishs your token by default
        const response = await fetch(`${serverUrl}/api/auth/token`);
        return response.json();
    } catch(err) {
        console.log(err);
        
    }
}

// export const uploadImage = async (imagePath: string) => {
//     try {
//         const response = await fetch(`${serverUrl}/api/upload`, {
//             method: "POST",
//             body: JSON.stringify({ path: imagePath })
//         })
//         // the response will contain the published url of the cloudinary server
//         return response.json();

//     } catch(err) {
//         console.log(err)
//     }
// }


export const uploadImage = async (imagePath: string) => {
    try {
      const response = await fetch(`${serverUrl}/api/upload`, {
        method: "POST",
        body: JSON.stringify({
          path: imagePath,
        }),
      });
    //   console.log(await response.json());
      
      return await response.json();
    } catch (err) {
      throw err;
    }
  };
  
export const createProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const { image } = form;
    // console.log("image is ", image);
    
    const imageUrl = await uploadImage(image);
    console.log("image URL", imageUrl.url);
    

    if(imageUrl.url) {
        client.setHeader("Authorization", `Bearer ${token}`);
        // client.setHeader('x-api-key', apiKey);

    const variables = {
      input: { 
        ...form, 
        image: imageUrl.url, 
        createdBy: { 
          link: creatorId 
        }
      }
    };


    return makeGraphQLRequest(createProjectMutation, variables);
    }

} 

// export const getUserProjects = async () => {

// }
export const fetchAllProjects = async (category?: string, endcursor?: string /*to Know in which page are we on */) => {
    client.setHeader('x-api-key', apiKey);
    return await makeGraphQLRequest(projectsQuery, { category, endcursor})
}

export const getProjectDetails = async (id: string) => {
  client.setHeader('x-api-key', apiKey);
  return await makeGraphQLRequest(getProjectByIdQuery, {id});
}

export const getUserProjects = async (id: string, last?: number) => {
  client.setHeader('x-api-key', apiKey);
  return await makeGraphQLRequest(getProjectsOfUserQuery, { id, last })
}

export const deleteProject = async (id: string, token: string) => {
  client.setHeader('Authorization', ` Bearer ${token}`);
  return await makeGraphQLRequest(deleteProjectMutation, { id })
}


export const editProject = async (form: ProjectForm, id: string, token: string) => {


  // check if the image is base64DataUrl
  const isBase64DataURL = (value: string): boolean => {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }

  let updatedForm = {...form};
  const isUploadingNewImage = isBase64DataURL(form.image);
  
  if(isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);

    if(imageUrl.url) {
      updatedForm = {
        ...form,
        image: imageUrl.url
      }
    }
  }
  client.setHeader('Authorization', ` Bearer ${token}`);

  const variables = {
    input: updatedForm,
    id
  }
  return await makeGraphQLRequest(updateProjectMutation, variables)
}