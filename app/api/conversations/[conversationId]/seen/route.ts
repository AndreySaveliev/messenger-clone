import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";

interface ParamsProps {
  conversationId?: string;
}


export async function POST(request: Request, { params }: { params: ParamsProps }) {
  try {
    const currentUser = await getCurrentUser()
    const { conversationId } = params

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("UNAUTHORIZE", { status: 401 })
    }

    // ищем переписку по id 
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        message: {
          include: {
            seen: true
          }
        },
        users: true
      }
    })

    if (!conversation) {
      return new NextResponse("INVALID ID", { status: 400 })
    }
    // ищем последнее сообщение в переписке
    const lastMessage = conversation.message[conversation.message.length - 1]

    if (!lastMessage) {
      return NextResponse.json(conversation)
    }
    //обновляем состояние seen в сообщении
    const updatedMessage = await prisma.message.update({
      where: {
        id: lastMessage.id
      },
      include: {
        sender: true,
        seen: true
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    })

    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      message: [updatedMessage]
    })

    if (lastMessage.seenIds.indexOf(currentUser.id) !== -1) {
      return NextResponse.json(conversation)
    }

    await pusherServer.trigger(conversationId!, 'message:update', updatedMessage)

    return NextResponse.json(updatedMessage)

  } catch (err: any) {
    console.log(err, "ERROR MESSAGES SEEN")
    return new NextResponse("INTERNAL ERROR", { status: 500 })
  }
}
