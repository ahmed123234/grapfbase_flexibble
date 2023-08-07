import { NextResponse } from "next/server";
import { v2 as cloudinary } from 'cloudinary'


// configure the cloudinary
// insetd of expose the sensetive data(api_key, api_secret) we will store them in .env
cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

export async function POST(request: Request) {
    // return the path from the request body
    const { path } = await request.json();
    // console.log("path", path);

    
    if(!path) {
        return NextResponse.json({ message: 'Image path is required'}, { status: 400 })
    }

    try {
        // define some additional information to cloudinary
        const options = {
            use_filename: true,
            unique_filename: false,
            overwrite: true,
            // transform the image before uploading
            transformation: [{ width: 1000, height: 752, crop: 'scale'}]
        }

        // create an instance of cloudinary
        const result = await cloudinary.uploader.upload(path, options)

        // console.log("result", result);
        
        return NextResponse.json(result , { status: 200 })

    }catch(err) {
       return NextResponse.json({ error: "Failed to upload image on Cloudinary" }, { status: 500 })
    }
}