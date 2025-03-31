import { Link } from "react-router-dom"

export default function ErrorBoundary() {
  
  return (
    <div className='flex flex-col gap-3 justify-center items-center text-center m-10 p-12'>
      <h4 className='text-4xl font-bold'>Oops!</h4>
      {/* <p>Sorry, an unexpected error has occurred. </p> */}
      <p className="mx-3 uppercase">The page you were looking for doesn't exist.</p>
      <Link to={"/"} >
        <a type="button" className=" uppercase">
          Go home
        </a>
      </Link>
    </div>
  )
}
