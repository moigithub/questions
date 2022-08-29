import { QuestionType } from '@prisma/client'
import { db } from '../../prisma/db'

export const getQuestions = ({
  userId,
  type
}: {
  userId?: string
  type?: QuestionType | undefined
}) => {
  return db.question.findMany({
    where: {
      userId: '1',
      ...(type && { type })
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
  return db.question.create({
    data: {
      userId,
      title,
      type
    }
  })
}

export const deleteQuestion = ({ questionId }: { questionId: any }) => {
  return db.question.delete({
    where: { id: Number(questionId) }
  })
}
