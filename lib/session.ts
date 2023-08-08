// keep all the data about the currently loggedin user
import { getServerSession } from "next-auth";
import { User, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import jsonwebtoken from 'jsonwebtoken'
import { JWT } from "next-auth/jwt";
import { SessionInterface, UserProfile } from "@/common.types";
import { createUser, getUser } from "./actions";
// you must make a connection to thne grafbase and also to the user model

export const authOptions: NextAuthOptions = {
    providers: [
        // OAuth provider
        GoogleProvider({
            // ! means that the feild must not be undefined
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    // this is useful to connect next-auth to grafbase
    jwt: {
        encode: ({ secret, token }) => {
           const encodedToken =  jsonwebtoken.sign({
                ...token,
                exp: Math.floor((new Date()).getTime() / 1000) + 60 * 60,
                iss: 'grafbase',
                sub:'sub',
            }, secret)
            return encodedToken;
        },
        decode: ({ secret, token }) => {
            const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;

            return decodedToken;
        }
    },
    theme: {
        colorScheme: 'light',
        logo: '/logo.svg'
    },
    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string;
            console.log("email is ", email);
            
            try {
                const data = await getUser(email) as { user?: UserProfile};

                const newSession = {
                    ...session,
                    user: {
                        ...session.user,
                        ...data?.user
                    }
                }
                return newSession;

            }catch(err: any) {
                console.log("error during session update", err.message);
                return session;
            }
        },
        async signIn({ user }: {user: User}) {
            try {
                // get the user from the database if exist
                const userExists = await getUser(user?.email as string) as { user? : UserProfile }

                // if they dont exist, then create them. save the created user in the database 
                // after the user is created we will get it imediatly by the serverSession
                if(!userExists.user) {
                    // use createUser mutation
                    await createUser(user.name as string, user.email as string, user.image as string);
                }
                // return true if they were existed or created  
                return true;
            } catch(err: any) {
                // throw err;

                console.log("an error occured", err.message);
                
                // something went wrong
                return false;
            }
        }
    }
}

export async function getCurrentUser() {
    //because it's a server-side component and can be rendered asyncronusly you can do top-level await 
    const session = await getServerSession(authOptions) as SessionInterface;    
    return session;
}