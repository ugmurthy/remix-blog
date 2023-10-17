import { Outlet , LiveReload , Link, Links, Meta} from "@remix-run/react";
import globalStylesUrl from './styles/global.css'

export const links = () => [{rel: 'stylesheet', href: globalStylesUrl}]

export const meta = () => {
  const description = "A Cool blog build using REMIX"
  const keywords = "Large, Language, Model, remix, react, javascript"

  return [{
    description,
    keywords,
  }]
}
export default function App() {
  return (
    
    <Document title="Remix Blog">
      <Layout>
      <Outlet/>
      </Layout>
    </Document>
  )
}


 function Document({children, title}) {
  return (
    <html lang='en'>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <Meta></Meta>
      <Links></Links>
      <title>{ title ? title : "Remix Blog"}</title>
    </head>
    <body>
    
     {children}
      {process.env.NODE_ENV === 'development' ? <LiveReload />:null}
    </body>
    
  </html>

  )
}

function Layout({children}) {
  return (
    <>
    <nav>
      <Link to='/' className='logo'>
        Remix
      </Link>

      <ul className="nav">
        <li>
          <Link to="/posts">Posts</Link>
        </li>
      </ul>
    </nav>
      
      <div className="container">
        {children}
      </div>
    </>
  )
}