import { ILayout } from "@docsvision/webclient/System/$Layout";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { NumberControl } from "@docsvision/webclient/Platform/Number";
import { TextareaControl } from "@docsvision/webclient/Legacy/TextareaControl";
import { TextArea, TextAreaParams } from "@docsvision/webclient/Platform/TextArea";


export class ApplicationLogic {
    
    // ========== ЛОГИКА СОХРАНЕНИЯ ==========
    
    public async validateBeforeSave(layout: ILayout): Promise<boolean> {
    const messageBoxSvc = layout.getService($MessageBox);
    
    try {
        // Проверяем контрол "Количество дней" на заполнение
        const daysControl = layout.controls.get<NumberControl>("KolDays");
        
        if (!daysControl) {
            await messageBoxSvc.showError('Контрол "Количество дней" не найден!');
            return false;
        }

        const daysValue = daysControl.params.value;
        
        // Проверяем, что поле заполнено (не null, не undefined и не 0)
        if (daysValue === null || daysValue === undefined || daysValue === 0) {
            await messageBoxSvc.showWarning('Поле "Количество дней" обязательно для заполнения!');
            return false; // Отменяем сохранение
        }

        // Дополнительная проверка: количество дней должно быть положительным
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

            // Если обе даты заполнены, проверяем корректность
            if (startDateValue && endDateValue) {
                const startDate = new Date(startDateValue);
                const endDate = new Date(endDateValue);

                if (endDate <= startDate) {
                    await messageBoxSvc.showError('Дата окончания должна быть больше даты начала!');
                    
                    // Сбрасываем значение контрола, который вызвал изменение
                    sender.value = null;
                }
            }
        } catch (error) {
            console.error('Ошибка при валидации дат:', error);
            await messageBoxSvc.showError('Ошибка при проверке дат');
        }
    }

    // ========== ЛОГИКА ОТОБРАЖЕНИЯ ИНФОРМАЦИИ ==========

    public async showCardInfo(layout: ILayout): Promise<void> {
    if (!layout) { return; }
    
    const messageBoxSvc = layout.getService($MessageBox);
    
    try {
        const documentNameControl = layout.controls.get<TextBox>("documentName");
        const regDateControl = layout.controls.get<DateTimePicker>("regDate");
        const startDateControl = layout.controls.get<DateTimePicker>("StartDate");
        const endDateControl = layout.controls.get<DateTimePicker>("EndDate");
        const reasonControl = layout.controls.get<TextArea>("Reason");

        // Формируем строки информации
        const lines = [
            `Название карточки: ${documentNameControl?.params.value || 'Не указано'}`,
            `Дата создания: ${regDateControl?.params.value ? 
                new Date(regDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'}`,
            `Дата с: ${startDateControl?.params.value ? 
                new Date(startDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'}`,
            `Дата по: ${endDateControl?.params.value ? 
                new Date(endDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'}`,
            `Основание для поездки: ${reasonControl.params.value || 'Не указано'}`
        ];

        // Объединяем строки и показываем сообщение
        const message = lines.join('\n');
        await messageBoxSvc.showInfo(message, "Информация о командировке");

    } catch (error) {
        console.error('Ошибка при отображении информации о карточке:', error);
        await messageBoxSvc.showError("Произошла ошибка при получении данных");
    }
}
}