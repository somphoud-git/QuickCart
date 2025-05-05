import { Inngest } from "inngest";
import { FileStack } from "lucide-react";
import connectDB from "./db";
import User from "@/models/User";
import { EmailAddress } from "@clerk/nextjs/dist/types/server";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest function to save user data to database
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'},
        async({event}) => {
        const  {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0], email_addresses,
            name: first_name + ' ' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.created(userData)
    }
)

//inngest function to delete user form database
export const syncUserUpation = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {
        event:'clerk/user-updated'},
        async ({event}) => {
        const {id, first_name, last_name, email_addresses, imageUrl} = event.data
        const userData = {
            _id:id,
            email: email_addresses[0].email_addresses,
            name: first_name + '' + last_name,
            imageUrl: image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id, userData)
    }
)

//inngest function to delete user form database
export const syncUserDeletetion = inngest.createFunction(
    {
        id:'delete-use-with-clerk'
    },
    {
        event:'clerk/user.deleted'
    },
    async ({event}) => {
    const {id} = event.data
    
    await connectDB()
    await User.findByIdAndDelete(id)
    }
)