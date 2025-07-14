
import { createContext } from 'react';

export interface IPopupProps {
  widget: IWidget;
  closePopup: ()=>void;
  onUpdateWidget: (widget: IWidget, updates: Partial<IWidget>) => void;
  onDeleteCode: (widget: IWidget, oldCode: string) => void;
  onAddCode: (widget: IWidget, newCode: string) => void;
  onChangeCode?: (widget: IWidget, newCode: string, oldCode?: string) => void;
  onDeleteWidget?: (widget:IWidget) => void;
}
const PopupContext = createContext<PopupProps | null>(null);
export default PopupContext
