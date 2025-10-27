import { ILayout } from "@docsvision/webclient/System/$Layout";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { TextArea, TextAreaParams } from "@docsvision/webclient/Platform/TextArea";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";



export class ApplicationLogic {
    
    
    public async validateBeforeSave(layout: ILayout): Promise<boolean> {
    const messageBoxSvc = layout.getService($MessageBox);
    
    try {
        const daysControl = layout.controls.get<NumberControl>("KolDays");
        
        if (!daysControl) {
            await messageBoxSvc.showError('Контрол "Количество дней" не найден!');
            return false;
        }

        const daysValue = daysControl.params.value;
        
        
        if (daysValue === null || daysValue === undefined || daysValue === 0) {
            await messageBoxSvc.showWarning('Поле "Количество дней" обязательно для заполнения!');
            return false; 
        }

      
        if (daysValue < 1) {
            await messageBoxSvc.showWarning('Количество дней должно быть больше 0!');
            return false;
        }

        return true;

    } catch (error) {
        console.error('Ошибка при проверке перед сохранением:', error);
        await messageBoxSvc.showError('Ошибка при проверке данных');
        return false;
    }
}

    public async sendSavingMsg(layout: ILayout): Promise<void> {
        await layout.getService($MessageBox).showInfo('Карточка сохраняется...');
    }

    public async sendSavedMsg(layout: ILayout): Promise<void> {
        await layout.getService($MessageBox).showInfo('Карточка успешно сохранена!');
    }

    public async validateDateRange(sender: DateTimePicker): Promise<void> {
        const layout = sender.layout;
        const messageBoxSvc = layout.getService($MessageBox);

        try {
            const startDateControl = layout.controls.get<DateTimePicker>("StartDate");
            const endDateControl = layout.controls.get<DateTimePicker>("EndDate");

            if (!startDateControl || !endDateControl) {
                await messageBoxSvc.showError('Контролы дат не найдены!');
                return;
            }

            const startDateValue = startDateControl.value;
            const endDateValue = endDateControl.value;

            
            if (startDateValue && endDateValue) {
                const startDate = new Date(startDateValue);
                const endDate = new Date(endDateValue);

                if (endDate <= startDate) {
                    await messageBoxSvc.showError('Дата окончания должна быть больше даты начала!');
                    
                    
                    sender.value = null;
                }
            }
        } catch (error) {
            console.error('Ошибка при валидации дат:', error);
            await messageBoxSvc.showError('Ошибка при проверке дат');
        }
    }

    

    public async showCardInfo(layout: ILayout): Promise<void> {
    if (!layout) { return; }
    
    const messageBoxSvc = layout.getService($MessageBox);
    
    try {
        const documentNameControl = layout.controls.get<TextBox>("documentName");
        const regDateControl = layout.controls.get<DateTimePicker>("regDate");
        const startDateControl = layout.controls.get<DateTimePicker>("StartDate");
        const endDateControl = layout.controls.get<DateTimePicker>("EndDate");
        const reasonControl = layout.controls.get<TextArea>("Reason");
        const cityControl = layout.controls.tryGet<DirectoryDesignerRow>("City");

        const lines = [
            `Название карточки: ${documentNameControl?.params.value || 'Не указано'}`,
            `Дата создания: ${regDateControl?.params.value ? 
                new Date(regDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'}`,
            `Дата с: ${startDateControl?.params.value ? 
                new Date(startDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'}`,
            `Дата по: ${endDateControl?.params.value ? 
                new Date(endDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'}`,
            `Основание для поездки: ${reasonControl.params.value || 'Не указано'}`,
            `Город: ${cityControl?.params.value.name|| 'Не указан'}`
        ];

        const message = lines.join('\n');
        await messageBoxSvc.showInfo(message, "Информация о командировке");

    } catch (error) {
        console.error('Ошибка при отображении информации о карточке:', error);
        await messageBoxSvc.showError("Произошла ошибка при получении данных");
    }
}
}