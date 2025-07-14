import {useState, useContext} from 'react'
import { IWidget, ISwitch, IThermo, ILock, IDimmer} from './widget.tsx'
import PopupContext from "./PopupContext.tsx"
import Comment from "./comment.tsx"
interface popProps  {
  closePopup: () => void;
  widget: IWidget;
}

function WidgetBody ({widget, closePopup}:popProps): JSX.Element{
 const context = useContext(PopupContext) ;
const {onUpdateWidget, onAddCode, onChangeCode, onDeleteCode } = context || {};

  const [isCodeMenuOpen, setIsCodeMenuOpen] = useState(false);
  const [newCode, setNewCode] = useState(null)
  const [oldCode, setOldCode] = useState(null)

  function changeTemp(newTemp:number): void{
    console.log("changing Temp")
    onUpdateWidget(widget, { temp: newTemp } as Partial<IThermostat>);
  }

  function changeMode (sMode:string): void {
    const newMode = sMode === 'AUTO' ? 'MANUAL' : 'AUTO';
    onUpdateWidget(widget, { mode: newMode } as Partial<IThermostat>);
  }

  function changeLevel (newLevel:number): void{
    onUpdateWidget(widget, {level: newLevel} as Partial<IDimmer>);
  }

  function addCode (newCode:string):void{
    if (onAddCode) { onAddCode(widget, newCode)};
  }

  function deleteCode (oldCode:string):void{
    if (onDeleteCode){onDeleteCode(widget, oldCode)}
  }

  function changeCode (newCode:string, oldCode:string):void{
    if (onChangeCode) {onChangeCode(widget, newCode, oldCode)}
  }


  function changeState (boolState: boolean):void{
    const newState = boolState ? "on" : "off"
    onUpdateWidget(widget, {state: newState} as Partial<ISwitch>);
  }

  function changeName (newName:string):void{
    onUpdateWidget(widget, {name: newName} as Partial<IWidget>);
  }

  


  function handleSubmitCodeChange():void{
    if (newCode !== "" &&  oldCode !== ""){
      console.log("changing code", newCode, oldCode)
      changeCode(newCode,oldCode)
      toggleCodeMenu("")
    }
    if (newCode !== "" && (oldCode === "" || oldCode === null)){
      addCode(newCode)
      toggleCodeMenu("")
    }

  }
  function toggleCodeMenu(code):void{
    console.log("opening?", isCodeMenuOpen)
    setIsCodeMenuOpen(!isCodeMenuOpen)
    setOldCode(code)
  }




  switch (widget.type){
    case 'SWITCH':
      return(
        <>
          <span>state: {widget.state}</span>
          <input className="" type="checkbox" checked={widget.state == "on" ? true : false} onChange={(e)=>changeState(e.target.checked)}/>
          <input className="hidden" type="text" onChange={changeState}/>
        </>
      )
    case 'LOCK':
      return(<>
        <div className="flex flex-col w-full "> 
          <span>
            locked: {widget.locked.toString()}
          </span>
          codes: {widget.codes.map((code, key)=>(<div className="pb-2 flex gap-x-3 justify-between w-full" key={key}>
            <span className="pr-4 flex justify-center items-center ">{code}</span>
            <div>
            <button className="p-1 rounded mx-4   border-gray-200 border-1 hover:border-gray-400 hover:bg-gray-400/20" onClick={()=>toggleCodeMenu(code)}>Change</button>
            <button className="rounded h-8 w-8 p-1 border-1 border-red-500 hover:border-red-700 hover:bg-red-500/10" onClick={()=>deleteCode(code)}>-</button>
          </div>
          </div>))}
          <button className="rounded h-8 hover:bg-green-500/20 border-1 border-green-400 hover:border-green-600" onClick={()=>toggleCodeMenu("")}>Add Code</button>
          { isCodeMenuOpen ? 
            <div onClick={()=>toggleCodeMenu("")} className="fixed bg-black/30 inset-0 flex justify-center items-center ">
              <div className="bg-gray-800 border-gray-600 flex flex-col gap-y-4 border rounded p-2 w-[300px] " onClick={(e)=>{e.stopPropagation()}}>
                <span>Enter New Code</span>
                <input type="text" className="bg-white pl-2 text-black" onChange={(e)=> setNewCode(e.target.value)}/>
                <button className=" border border-gray-500 hover:text-black hover:bg-gray-300 transition-all " type="submit" onClick={handleSubmitCodeChange}>Save</button>
              </div>
            </div>
            : null }
        </div>
        </>
      )
    case 'DIMMER':
      return(
        <div className="flex w-full flex-col gap-y-4">
          <span>Level: {widget.level}</span>
          <input type="range" step=".01" min="-10" max="10" value={widget.level} onChange={(e) => changeLevel(e.target.value)}/>
        </div>
      )
    case 'THERMO':
      return(
        <>
          <div className="flex flex-col gap-y-4">
            <span>temperature: {widget.temp}</span>
            <input 
              type="range" 
              min="64" 
              max="82" 
              value={widget.temp || 70} 
              onChange={(e) => changeTemp(Number(e.target.value))}
              disabled={widget.mode === "AUTO" ? true : false}
            />
            <button
              className={`rounded h-8 px-4 ${widget.mode === "AUTO" ? "text-white bg-blue-400" : "text-black bg-yellow-400"}`}
              onClick={()=>changeMode(widget.mode)}
            >
              {widget.mode || "AUTO"}
            </button>
          </div>
        </>
      )
    default:
      return (
        <div>
          widget type not found
        </div>
      )
  }
}

export default function Popup({widget, closePopup}: popProps ){
  const context = useContext(PopupContext)
  if (!context){throw new Error("Popup has no context bruh")}
  const {onUpdateWidget, onDeleteWidget} = context || {};
  function handleClosePopup(){
    closePopup()
  }
  function deleteWidget ():void{
    onDeleteWidget(widget)
    closePopup()
  }
const widgetName = widget.name[0].toUpperCase() + widget.name.slice(1)
  return(<>
    <div className=" fixed flex inset-0  items-center justify-center text-white h-screen w-screen bg-black/30 backdrop-blur-sm" onClick={handleClosePopup}>
      <div className="h-[60vh] overflow-y-scroll py-2 w-[60vw] bg-gray-800 text-white rounded border-1 border-black/80" onClick={(e)=>{e.stopPropagation()}}>
        <div className="text-2xl p-4 w-full flex justify-between ">
          <span>{widgetName}</span>
          <div className="rounded transition-all ease-in-out duration-1000 h-8 w-8 border border-gray-800 hover:bg-gray-800" />
          <button className=" rounded h-8 w-8 border border-gray-400 hover:bg-gray-400" onClick={handleClosePopup}>X</button>
        </div>
        <div className="px-4 text-white flex flex-col">
          <WidgetBody widget={widget} onUpdateWidget={onUpdateWidget}/>
        </div>
        <div className="px-4 flex flex-col gap-y-2">
         <Comment comments={widget.comments} />  
        </div>
        <div className="flex mr-4 justify-end">
        <button className="bg-red-500 h-full rounded h-8 w-16 hover:bg-red-700" onClick={deleteWidget}>Delete</button>
        </div>
      </div>
    </div>
  </>)
}
