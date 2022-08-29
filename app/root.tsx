import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch
} from '@remix-run/react'
import styles from './styles/app.css'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1'
})

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: styles
  }
]

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return <div className='container mx-auto max-w-5xl'>{children}</div>
}

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error('Error', error)
  return (
    <Document>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-red-400 font-bold text-3xl'>There was an error</h1>
        <p>{error?.message}</p>
      </div>
    </Document>
  )
}

export function CatchBoundary({ error }: { error: Error }) {
  const caught = useCatch()

  console.error('catch error', error, caught)

  let message = ''
  switch (caught.status) {
    case 401:
      message = 'UnAuthorized!'
      break
    case 404:
      message = 'Page not found!'
      break
    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <Document>
      <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-red-400 font-bold text-3xl'>{message}</h1>
        <p>
          {caught.status}: {caught.statusText}
        </p>
      </div>
    </Document>
  )
}
