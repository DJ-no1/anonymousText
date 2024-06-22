import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/option";


export async function DELETE (request: Request, { params}: {params: {messageid: string}}) {
    const messageId = params.messageid
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User = session?.user as User


    try {
        const updateResult = await UserModel.updateOne(
            {_id: user.id},
            {$pull: {messages: {_id: messageId}}}
        )
        if (updateResult.modifiedCount == 0) {
            return Response.json(
                {
                    success: false,
                    message: 'Message not found'
                },
                {status: 404}
            )
        }
        return Response.json(
            {
                success: true,
                message: 'Message deleted successfully'
            },
            {status: 200}
        )
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: 'Failed to delete message'
            },
            {status: 500}
        )
    }

}