import {Link,useRouteError,
  isRouteErrorResponse} from '@remix-run/react'
import { redirect } from '@remix-run/node'
import { db } from '../utils/db.server'

export const action = async ({request}) => {
  // executes on server side
  const form = await request.formData()

  const title = form.get("title")
  const body = form.get("body")
  const fields = {title,body}
  console.log(fields)
  console.log(form)
// @todo submit to database
  const post = await db.post.create({data:fields})

 return redirect(`/posts/${post.id}`);
}

function New() {
    return (
      <>
      <div className="page-header">
        <h1>New Post</h1>
        <Link to="/posts" className="btn btn-reverse">Back</Link>
      </div>
         <div className="page-content">
          <form method="POST">
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title"></input>
            </div>

            <div className="form-control">
              <label htmlFor="body">Post</label>
              <textarea type="text" name="body" id="body"></textarea>
            </div>
            <button type="submit" className='btn btn-block'>Add Post</button>
          </form>
         </div>
      </>
    )
  }
 
  export default New

////
export function ErrorBoundary() {
  const error = useRouteError();
  console.log("Error :",error.message)
  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>{error.message}</p>
      </div>
    )
  }
}
