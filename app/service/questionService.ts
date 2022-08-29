import type { QuestionType } from '@prisma/client'
import { db } from '../../prisma/db'

export const getQuestions = ({
  userId,
  type
}: {
  userId?: string
  type?: QuestionType | undefined
}) => {
  return db.balotario.findMany({
    where: {
      userId: '1',
      ...(type && { type })
    }
  })
}

export const getQuestionDetail = ({ id }: { id: string }) => {
  return db.balotario.findUnique({
    where: {
      id
    }
  })
}

export const saveQuestion = ({
  userId,
  title,
  type
}: {
  userId: string
  title: string
  type: QuestionType
}) => {
  return db.balotario.create({
    data: {
      userId,
      title,
      type
    }
  })
}

export const deleteQuestion = ({ questionId }: { questionId: any }) => {
  return db.balotario.delete({
    where: { id: questionId }
  })
}
