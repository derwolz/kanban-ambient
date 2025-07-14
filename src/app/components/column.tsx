import React from 'react';
import Widget from './widget.tsx';
import {IColumn} from "./interface.tsx"

const colors = {
red: 'bg-red-500',
orange: 'bg-orange-500',
yellow: 'bg-yellow-500',
green: 'bg-green-500'
} as const
interface ColumnProps {
  index:number;
  column:IColumn;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, columnIndex: number) => void;
  onDragStart: (widget: IWidget, sourceColumnIndex: number, widgetIndex: number) => void;
  
}
export default function Column({ index, column, onDragOver, onDrop, onDragStart}: ColumnProps){
  const color = colors[column.color as keyof typeof colors] || 'bg-gray-500'
  const columnName = column.name[0].toUpperCase() + column.name.slice(1)
  return (
    <div 
      className='w-full max-h-full m-2 min-h-48  bg-gray-900 border-1 border-gray-800 rounded-[10px]'
      onDragOver={onDragOver}
      onDrop={(e)=> onDrop(e, index)}
    >
      <div className={`py-4 text-xl p-2 rounded-t-[10px]`} >
      <h2>{columnName} </h2>
      </div>
      <div className="flex px-2 flex-col items-center justify-start">
        {column.devices.map((widget, key) =>(
        <Widget 
            widget={widget} 
            key={key}
            onDragStart={(w) => onDragStart(w, index, key)}
          />
        )
        )}
      </div>
      </div>
  )
}
