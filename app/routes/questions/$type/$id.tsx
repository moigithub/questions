import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { getQuestionDetail } from '~/service/questionService'

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params

  if (!id) throw new Error('Not found')
  const data = await getQuestionDetail({ id })
  if (!data) throw new Error('Not found')
  console.log('detail', data)
  return { data }
}

export default function QuestionDetail() {
  const { data } = useLoaderData()

  return (
    <div>
      <h2 className='text-3xl text-bold my-2'>Question Detail</h2>
      <h3 className='text-2xl text-bold my-2'>{data.title}</h3>
      <p>
        <span className='text-bold my-2 mr-2'>Type:</span>
        <span>{data.type}</span>
      </p>
      <p>
        <span className='text-bold my-2 mr-2'>Created at:</span>
        <span>{data.createdAt}</span>
      </p>

      <Link to='/questions' className='mt-6 text-cyan-800'>
        Back
      </Link>
    </div>
  )
}
