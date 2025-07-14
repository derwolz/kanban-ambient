import {IComment} from "./interface.tsx"

export default function Comment({comments}:{comments:IComment}){

function makeHumanReadable(timeStamp:string){
    const date = new Date(timeStamp)
return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }
  return (
    <>
      <h4 className="text-white text-xl mt-4"> Comments:</h4>
      <div className="flex flex-col h-64 mb-4 justify-start overflow-x-scroll bg-gray-400 rounded w-full p-2">
        {comments && comments.map((comment, key) => (
         <div key={key} className="flex justify-between bg-gray-800 p-2 rounded w-full text-white my-2"> 
            <div  className="flex flex-col mx-2 gap-y-2">
              {comment.settings.map(
                (c,keyb)=>(
                  <div  className="hello" key={keyb}>{c}</div>
                )
              )}
            </div>

            <span>{makeHumanReadable(comment.timeStamp)}</span>
        </div>
        ))
        }
      </div>
    </>
  )
}
