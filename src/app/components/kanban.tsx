"use client"
import react, {useContext, useState, useEffect} from 'react'
import Column from './column.tsx'
import {IWidget} from './interface.tsx'
import {TDraggedWidget, TKanbanData} from './types.tsx'

import PopupContext from "./PopupContext.tsx"
interface KanbanProps extends IPopupProps{
  initialData,
  onWidgetMove?: (widget: IWidget, sourceColumnIndex: number, targetColumnIndex: number) => void,
  onWidgetUpdate?: (widget: IWidget) => void,
  onWidgetDelete?: (widgetIndex: number) => void;
}
export default function Kanban({
  initialData, 
  onWidgetMove,
  onWidgetUpdate,
  onWidgetDelete
}: KanbanProps){ 

  const [draggedWidget, setDraggedWidget] = useState<DraggedWidget | null>(null)
  const [columns, setColumns] = useState<KanbanData>(initialData);
  const popupProps = {
    closePopup: () => {},
    onUpdateWidget: (targetWidget: IWidget, updates: Partial<IWidget>) => { 
      setColumns(prev => 
        prev.map(column => ({
          ...column,
          devices: column.devices.map(widget => 
            widget === targetWidget 
              ? { ...widget, ...updates }
              : widget
          )
        }))
      );
    },

    onDeleteCode: (targetWidget: IWidget, oldCode:string) => {
      setColumns(prev => 
        prev.map(column => ({
          ...column,
          devices: column.devices.map(widget => 
            widget === targetWidget 
              ? { 
                ...widget, 
                codes: (widget as ILock).codes.filter((code) => 
                  code !== oldCode
                )
              }
              : widget
          )
        }))
      );
    },

    onAddCode: (targetWidget: IWidget, newCode: string) => { 
      console.log("newCode", newCode)
      setColumns(prev => 
        prev.map(column => ({
          ...column,
          devices: column.devices.map(widget => 
            widget === targetWidget 
              ? { ...widget, codes: [...(widget as ILock).codes, newCode] }
              : widget
          )
        }))
      );
    }, 

    onChangeCode: (targetWidget: IWidget, newCode:string, oldCode:string) => { 
      setColumns(prev =>  
        prev.map(column => ({
          ...column,
          devices: column.devices.map(widget => 
            widget === targetWidget 
              ? { 
                ...widget, 
                codes: (widget as ILock).codes.map((code) => 
                  code === oldCode ? newCode : code
                )
              }
              : widget
          )
        }))
      );
    },

    onDeleteWidget: (targetWidget: IWidget) => { 
      setColumns(prev => 
        prev.map(column => ({
          ...column,
          devices: column.devices.filter(widget => widget !== targetWidget)
        }))
      );

      console.log('onDeleteWidget') /* your logic */ }
  };


  function handleDragStart(widget: IWidget, sourceColumnIndex: number, oldIndex: number): void {
    setDraggedWidget({widget, sourceColumnIndex, oldIndex});
    setColumns(prevColumns =>
      prevColumns.map((col, colIdx)=>({
        ...col,
        devices: col.devices.map( (w,idx)=>
          idx === oldIndex && colIdx === sourceColumnIndex ? 
            {...w, isDragging: true} : w
        )
      }))
    )
  };

  function handleDragOver (e: React.DragEvent): void {
    e.preventDefault();
  }

  useEffect(()=>console.log(columns),[columns])

  function handleDrop (e: React.DragEvent, targetColumnIndex: number ): void {
    e.preventDefault();
    const sourceColumnIndex = draggedWidget?.sourceColumnIndex
    console.log(draggedWidget)
    console.log("sourceColumnIndex",sourceColumnIndex, draggedWidget, draggedWidget.oldIndex)
    if (!draggedWidget || draggedWidget.sourceColumnIndex === targetColumnIndex){
      setDraggedWidget(null);
      //
      // Reset isDragging state
      setColumns(prevColumns => 
        prevColumns.map(col => ({
          ...col,
          devices: col.devices.map((w) => 
          ({
          ...w,
          isDragging: false, 
          })
        )
        }))
      );
      return;
    }

    // if the widget is dragged to a new column, then add it with timestamp, filtering for redundant fields
    setColumns(prevColumns => {
      const newColumns = [...prevColumns];


      if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
        newColumns[sourceColumnIndex] = {
          ...newColumns[sourceColumnIndex],
          devices: newColumns[sourceColumnIndex].devices.filter(
            (w,idx)=> idx !== draggedWidget.oldIndex
          )
        };
        const draggedWidgetCopy = {
          ...draggedWidget.widget,
          isDragging: false,
          comments: [
          ...(draggedWidget.widget.comments || [] ).map(c => ({...c})),
          {
            settings: 
              Object.entries(draggedWidget.widget)
            .filter(([key]) => !['name','comments', 'isDragging', 'type'].includes(key))
            .map(([key, value]) => `${key}: ${value}`)
            ,
            timeStamp: new Date().toISOString()
            }
          ]
        };

        newColumns[targetColumnIndex] = {
          ...newColumns[targetColumnIndex],
          devices: [...newColumns[targetColumnIndex].devices, draggedWidgetCopy]
        }
      }


      return newColumns;
    });
    onWidgetMove?.(draggedWidget.widget, draggedWidget.sourceColumnIndex, targetColumnIndex);
    setDraggedWidget(null);
  }

  return (
    <div className="w-full flex items-center justify-start md:overflow-hidden rounded ">
      <PopupContext.Provider value={popupProps}>
        <div className="w-full flex flex-row flex-wrap md:flex-nowrap items-start justify-start">

          {columns.map((col, key) =>(
            <Column 
              column={col} 
              key={key}
              index={key}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragStart={handleDragStart}
            />
          ))
          }
        </div>
      </PopupContext.Provider >
    </div>
  )
}
