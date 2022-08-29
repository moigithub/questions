import type { ActionFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form } from '@remix-run/react'
import { saveQuestion } from '~/service/questionService'

export const action: ActionFunction = async ({ request, params }) => {
  const data = await request.formData()
  const title = data.get('title')
  console.log('param', params)
  const type = params.type?.toUpperCase()

  if (title) {
    const question = await saveQuestion({ userId: '1', title, type })
    console.log('question result', question)
  }
  return redirect('/questions')
}

export default function New() {
  return (
    <div>
      <h2 className='text-bold text-3xl my-2'>New Question</h2>
      <Form method='post'>
        <fieldset>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            required
            className='p-2 mx-2 border border-cyan-300'
          />
        </fieldset>

        <button className='px-3 py-2 mt-2 rounded bg-blue-700 text-white' type='submit'>
          Save
        </button>
      </Form>
    </div>
  )
}
