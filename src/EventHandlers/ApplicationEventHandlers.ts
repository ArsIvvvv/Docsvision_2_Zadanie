import { ApplicationLogic } from "../Logic/ApplicationLogic";
import { ILayout } from "@docsvision/webclient/System/$Layout";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { NumberControl } from "@docsvision/webclient/Platform/Number";

// ========== СОХРАНЕНИЕ КАРТОЧКИ ==========

export async function ddApplication_OnSaving(sender: ILayout, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    
    // Проверяем заполнение обязательного поля перед сохранением
    const isValid = await logic.validateBeforeSave(sender);
    if (!isValid) {
        // Отменяем сохранение если проверка не пройдена
        (args as any).savingCancelled = true;
        return;
    }
    
    console.log('Карточка сохраняется...');
    await logic.sendSavingMsg(sender);
}


export async function ddApplication_OnSaved(sender: ILayout, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    await logic.sendSavedMsg(sender);
}

// ========== ОБРАБОТКА ДАТ ==========

export async function ddDateRange_OnDateChange(sender: DateTimePicker, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    await logic.validateDateRange(sender);
}

// ========== КНОПКА ИНФОРМАЦИИ ==========

export async function ddShowCardInfo_OnClick(sender: any, args: IEventArgs): Promise<void> {
    const logic = new ApplicationLogic();
    // Передаем layout вместо sender
    await logic.showCardInfo(sender.layout);
}
