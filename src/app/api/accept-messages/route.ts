import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";


export async function POST (request: Request) {
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user = session?.user as User;


    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: 'Not Authenticated'
            },
            {status: 401}
        )
    }
        const userid = user._id;
        const { acceptMessages } = await request.json();
        try {
            const updateUser = await UserModel.findByIdAndUpdate(userid,
                {isAcceptingMessages: acceptMessages}, 
            {new: true});
            if (!updateUser) {
                return Response.json(
                    {
                        success: false,
                        message: 'failed to update user status to accept messages'
                    },
                    {status: 401}
                )
                
            }
            else{
                return Response.json(
                    {
                        success: true,
                        message: 'Message acceptance status updated successfully'
                    },
                    {status: 200}
                )
            }
        } catch (error) {
            console.log("Failed to update user status to accept messages ")
            return Response.json(
                {
                    success: false,
                    message: 'Failed to update user status to accept messages'
                },
                {status: 500}
            )
        }
}

export async function GET (request: Request) {
await dbConnect();
const session = await getServerSession(authOptions);
const user = session?.user;
if (!session || !session.user) {
    return Response.json(
        {
            success: false,
            message: 'Not Authenticated'
        },
        {status: 401}
    ) 

}
try {
    const userid = user._id;
    const foundUser = await UserModel.findById(userid) 
    if (!foundUser) {
        return Response.json(
            {
                success: false,
                message: 'User not found'
            },
            {status: 404}
        )
    }
    return Response.json(
        {
            success: true,
            isAcceptingMessages: foundUser.isAcceptingMessages,
        },
        {status: 200}
    )
        
} catch (error) {
    console.log("Failed to get user status to accept messages ")
    return Response.json(
        {
            success: false,
            message: 'Failed to get user status to accept messages'
        },
        {status: 500}
    )
    
}


}