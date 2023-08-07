"use client";
import { ProjectInterface, SessionInterface } from '@/common.types'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Button, CustomMenu, FormField } from '.';
import { categoryFilters } from '@/constant';
import { createProject, editProject, fetchToken } from '@/lib/actions';
import { useRouter } from 'next/navigation';

type props = {
    type: string,
    session: SessionInterface, 
    project?: ProjectInterface
}
const ProjectForm = ({ type, session, project }: props ) => {

    // helper state to know if we currently submiting the form or not while it's loading
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const [form, setForm] = useState({
        title: project?.title || '',
        image: project?.image || '',
        description: project?.description || '',
        liveSiteUrl: project?.liveSiteUrl || '',
        githubUrl: project?.githubUrl || '', 
        category: project?.category || ''
    });

    
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const token = await fetchToken();
        try {
             // create project
             if(type === 'create') {                
                await createProject(form, session?.user?.id, token)

                router.push("/")
           
             }

             if(type === 'edit') {
                await editProject(form, project?.id as string , token)
                router.push("/")
             }

        } catch(err: any) {
           console.log(err.message);
           
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault(); //prevent the default behaviour of the browser to reload the page
        const file = e.target.files?.[0]; // assigned the file to file object if present
        if(!file) return;

        if(!file.type.includes('image')) {
            return alert("Please upload an image file");
        }

        const reader = new FileReader();
        // read the data as data url 
        reader.readAsDataURL(file);
        reader.onload = () => {
            // get the reader result
            const result = reader.result as string
            handleStateChange('image', result);
            // TODO: the result will be passed to cloudinary when the post is created to be uploaded to the server 
        }
    }

    const handleStateChange = (filedName: string, value: string) => {
        setForm((prevState) => ({ ...prevState, [filedName]: value }))
    }


    // useEffect(() => {

    //     if (project?.title) {
    //         console.log("project is", project);
            
    //         handleStateChange('title', project?.title)
    //         handleStateChange('description', project?.description)
    //         handleStateChange('category', project?.category)
    //         handleStateChange('githubUrl', project?.githubUrl)
    //         handleStateChange('image', project?.image)
    //         handleStateChange('liveSiteUrl', project?.liveSiteUrl)
            
    //     }
        
    // }, [])


  return (
    <form onSubmit={handleFormSubmit}
        className='flexStart form'
    >   
        <div className="flexStart form_image-container">
            <label htmlFor="poster"
                className='flexCenter form_image-label'
            >
                {!form.image && 'Choose a poster for your project'}
                {form.image && (
                <Image  src={form?.image} 
                    className='sm:p-10 object-contain z-20'
                    width={300}
                    height={300}
                    alt='Project poster'
                />
            )}
            </label>
            <input type="file" accept='image/**' id='image' 
                required={type == 'create'}
                className='form_image-input'
                onChange={handleChangeImage}
            />
            
        </div>

        {/* creating the form fileds for the uploaded project */}
        <FormField 
            title='Title'
            state={form?.title}
            placeholder='Flexibble'
            setState={(value: string) => handleStateChange('title', value)}
        />
        <FormField 
            title='Description'
            state={form?.description}
            placeholder='Showcase and discover remarkable developer projects.'
            setState={(value: string) => handleStateChange('description', value)}
        />
        <FormField 
            type='url'
            title='Website URL'
            state={form?.liveSiteUrl}
            placeholder='https://ahmadTools.pro'
            setState={(value: string) => handleStateChange('liveSiteUrl', value)}
        />
        <FormField 
            type='url'
            title='GitHub URL'
            state={form?.githubUrl}
            placeholder='https://github.com/ahmad1212'
            setState={(value: string) => handleStateChange('githubUrl', value)}
        />
        {/* Custom input for the category ...... */}
        <CustomMenu  
            title='Category'
            state={form.category}
            filters={categoryFilters}
            setState={(value) => handleStateChange('category', value)}
        />

        <div className="flexStart w-full">
            {/* <button className='capitalize'>create</button> */}
            <Button 
                title={isSubmitting ? `${type === 'create' ? 'Creating' : 'Editting' }` : 
                    `${type === 'create' ? 'Create' : 'Edit'}`
            }
                type='submit'
                leftIcon={isSubmitting? "": '/plus.svg'}
                isSubmitting={isSubmitting}
            />
        </div>
    </form>
  )
}

export default ProjectForm