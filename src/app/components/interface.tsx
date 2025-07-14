
interface IWidget {
  name: string,
  type: string
  isDragging?: boolean;
  comments: string[];
} 

interface ISwitch extends IWidget {
  type: 'SWITCH'
  state: string
}

interface ILock extends IWidget {
  type: 'LOCK'
  codes: string[]
  locked: boolean
}

interface IDimmer extends IWidget {
  type: 'DIMMER'
  level: number
}

interface IThermostat extends IWidget{ 
  type: 'THERMO'
  temp: number
  mode: string
  
}
interface IColumn{
  name: string,
  color: string,
  devices: IWidget[]
}
interface IComment{
  settings: string[],
  timeStamp: string
}
interface IKanban {

}
export {IWidget, IColumn, ISwitch, ILock, IDimmer, IThermostat}
