import { ApplicationLogic } from "../Logic/ApplicationLogic";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { CancelableEventArgs } from "@docsvision/webclient/System/CancelableEventArgs";
import { ICardSavingEventArgs } from "@docsvision/webclient/System/ICardSavingEventArgs";


export async function ddApplication_OnSaving(sender: ILayout, args: CancelableEventArgs<ICardSavingEventArgs>): Promise<void> {
    const logic = new ApplicationLogic();
    
    const isValid = await logic.validateBeforeSave(sender);
    if (!isValid) {
        
        args.cancel();
        return;
    }
     
    console.log('Карточка сохраняется...');
    await logic.sendSavingMsg(sender);
    args.accept(); 
}


export async function ddApplication_OnSaved(sender: ILayout, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    await logic.sendSavedMsg(sender);
}


export async function ddDateRange_OnDateChange(sender: DateTimePicker, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    await logic.validateDateRange(sender);
}


export async function ddShowCardInfo_OnClick(sender: any, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    await logic.showCardInfo(sender.layout);
}
