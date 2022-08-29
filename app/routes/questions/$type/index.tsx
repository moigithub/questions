import type { Question } from '@prisma/client'
import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, Link, Outlet, useLoaderData } from '@remix-run/react'
import { deleteQuestion, getQuestions } from '~/service/questionService'

export const loader: LoaderFunction = async ({ params }) => {
  const type = params.type

  let questions: Question[] = []
  if (type && ['DAILY', 'WEEKLY', 'MONTHLY'].includes(type.toUpperCase())) {
    questions = await getQuestions({ type: type.toUpperCase() })
  }
  return { questions }
}

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData()
  const questionId = data.get('id') || ''
  const deleteResult = await deleteQuestion({ questionId })
  console.log('deleteResult', deleteResult)
  return redirect('/questions')
}

type Questions = { questions: Question[] }

export default function QuestionView() {
  const { questions } = useLoaderData<Questions>()
  console.log('list questions', questions)
  let classType = 'flex justify-center items-center rounded text-[10px] p-px px-1 uppercase'

  return (
    <div>
      <h2 className='text-3xl text-bold my-2'>Questions</h2>
      <div className='flex justify-between items-center'>
        <div>
          <Link to='/questions/daily/new' className='px-4 py-2 m-2 rounded bg-green-700 text-white'>
            Add Daily Question
          </Link>
          <Link to='/questions/weekly/new' className='px-4 py-2 m-2 rounded bg-blue-700 text-white'>
            Add Weekly Question
          </Link>
          <Link
            to='/questions/monthly/new'
            className='px-4 py-2 m-2 rounded bg-purple-700 text-white'
          >
            Add Monthly Question
          </Link>
        </div>
        <Link to='/questions' className='px-4 py-2 m-2 border rounded text-black'>
          View all
        </Link>
      </div>
      <ul className='my-4'>
        {questions.map(question => {
          switch (question.type) {
            case 'DAILY':
              classType += ' text-white bg-green-500'
              break
            case 'WEEKLY':
              classType += ' text-white bg-blue-500'
              break
            case 'MONTHLY':
              classType += ' text-white bg-purple-500'
              break
            default:
              classType += ' text-white bg-green-500'
              break
          }
          return (
            <li key={question.id}>
              <div className='px-2 py-2 border border-slate-200 flex justify-between items-center'>
                <span className='flex items-center'>
                  <span className={classType}>{question.type}</span>
                  <span className='ml-3 text-bold'>{question.title}</span>
                </span>
                <Form method='post'>
                  <input type='hidden' name='id' value={question.id} />
                  <button
                    type='submit'
                    className='cursor-pointer text-white flex justify-center items-center rounded bg-red-600 h-[32px] w-[32px]'
                  >
                    X
                  </button>
                </Form>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
