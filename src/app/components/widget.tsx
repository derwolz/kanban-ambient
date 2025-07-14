"use client"
import react from 'react'
import Popup from './popup.tsx'
import {useState} from 'react'
import {IWidget} from './interface.tsx'
interface WidgetProps {

  widget: IWidget;
  onDragStart: (widget: IWidget) => void;
}
function WidgetBody ({widget}:{widget:IWidget}){

    switch (widget.type){
      case 'SWITCH':
      return(
        <div>
        </div>
      )
      case 'LOCK':
        return(
        <div> 
        </div>
      )
      case 'DIMMER':
        return(
        <div>
        </div>
      )
      case 'THERMO':
        return(
        <div>
        </div>
      )
      default:
      return (
        <div>
        widget type not found
</div>
      )
    }
  }

export default function Widget({widget, onDragStart}:WidgetProps){

    const [popupOpen, setPopupOpen] = useState(false);

  function handleDragStart(e: React.DragEvent) {
    onDragStart(widget)
    console.log("dragging")
  }
    function togglePopup() {setPopupOpen(!popupOpen)}
    return (<><div 
    className=" m-2 rounded bg-white/20 w-full max-h-2xl hover:cursor-grab hover:bg-white/30"
    draggable
    onDragStart={handleDragStart}
    style={{opacity: widget.isDragging ? 0.5: 1}}
  >
    
      <div className="p-2 pt-2 flex justify-between items-center">
        <h3>{widget.name}</h3>
        <button className="hover:bg-black/20 h-8 w-8 rounded" onClick={togglePopup}>⚙️</button>
      </div>
</div>
    
      { popupOpen &&
      <Popup   widget={widget} closePopup={togglePopup}/> }
    </>
    )
  }
