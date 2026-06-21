import { AiRole, Prisma } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

export class AiRepository {
  listConversations(userId: string) {
    return prisma.aiConversation.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      include: { messages: { orderBy: { createdAt: "asc" }, take: 20 } }
    });
  }

  getConversation(userId: string, conversationId: string) {
    return prisma.aiConversation.findFirst({
      where: { id: conversationId, userId },
      include: { messages: { orderBy: { createdAt: "asc" } } }
    });
  }

  createConversation(userId: string, title: string) {
    return prisma.aiConversation.create({ data: { userId, title } });
  }

  addMessage(conversationId: string, role: AiRole, content: string, metadata: Prisma.InputJsonValue = {}) {
    return prisma.aiMessage.create({
      data: {
        conversationId,
        role,
        content,
        metadata
      }
    });
  }
}
