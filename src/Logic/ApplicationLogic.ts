import { ILayout } from "@docsvision/webclient/System/$Layout";
import { $MessageBox } from "@docsvision/webclient/System/$MessageBox";
import { DateTimePicker } from "@docsvision/webclient/Platform/DateTimePicker";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { NumberControl, NumberParams } from "@docsvision/webclient/Platform/Number";
import { TextArea, TextAreaParams } from "@docsvision/webclient/Platform/TextArea";
import { DirectoryDesignerRow } from "@docsvision/webclient/BackOffice/DirectoryDesignerRow";
import { Layout } from "@docsvision/webclient/System/Layout";
import { $OfficeService } from "../Service/Interface/IOfficeService";
import { StaffDirectoryItems } from "@docsvision/webclient/BackOffice/StaffDirectoryItems";
import { $DepartmentController, $EmployeeController } from "@docsvision/webclient/Generated/DocsVision.WebClient.Controllers";





export class ApplicationLogic {
    
    
    public async validateBeforeSave(layout: ILayout): Promise<boolean> 
    {
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

    

    public async showCardInfo(layout: ILayout): Promise<void> 
    {
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
                new Date(endDateControl.params.value).toLocaleDateString('ru-RU') :     'Не указана'}`,
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
    public async onBusinessTripEmployeeChanged(sender: any, layout: Layout): Promise<void> {
    const messageBoxSvc = layout.getService($MessageBox);
    
    try {
        const selectedEmployee = sender.params.value;
        
        if (!selectedEmployee?.id) {
            await messageBoxSvc.showWarning('Сотрудник не выбран');
            return;
        }

        const response = await layout.getService($OfficeService).ChangeManager({
            documentId: layout.cardInfo.id,
            employeeId: selectedEmployee.id
        });

        
        const employeeControl = layout.controls.get<StaffDirectoryItems>("staffDirectoryItems1");
        const textControl = layout.controls.get<TextBox>("textBox2");

        const employeeController = layout.getService($EmployeeController);
        const managerInfo = await employeeController.getEmployee(response.name,{isShowOverlay: false});
       
        employeeControl.params.value = managerInfo;   
        

        console.log( employeeControl.params.value);

        if (textControl) {
            textControl.params.value = response.phone.toString();
        }

        await messageBoxSvc.showInfo('Данные обновлены');

    } catch (error) {
        await messageBoxSvc.showError('Ошибка: ' + error.message);
    }
}
    public async onBusinessTripSumChanged(sender: any, layout: Layout): Promise<void> {
    
        
        const cityControl = layout.controls.get<DirectoryDesignerRow>("City");
        const daysControl = layout.controls.get<NumberControl>("KolDays"); 
        const sumControl = layout.controls.get<NumberControl>("number2"); 

        const selectedCity = cityControl.params.value;
        const daysCount = daysControl.params.value;

        console.log( selectedCity);

        const response = await layout.getService($OfficeService).ChangeSum({
            city: selectedCity.name,
            days: daysCount
        });

        sumControl.params.value = response.sum; 
   } 
}