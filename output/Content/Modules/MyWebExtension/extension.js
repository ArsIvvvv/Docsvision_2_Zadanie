define(['tslib', '@docsvision/webclient/System/$MessageBox', '@docsvision/webclient/System/ExtensionManager'], (function (tslib, $MessageBox, ExtensionManager) { 'use strict';

    var ApplicationLogic = /** @class */ (function () {
        function ApplicationLogic() {
        }
        // ========== ЛОГИКА СОХРАНЕНИЯ ==========
        ApplicationLogic.prototype.validateBeforeSave = function (layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var messageBoxSvc, daysControl, daysValue, error_1;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            messageBoxSvc = layout.getService($MessageBox.$MessageBox);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 8, , 10]);
                            daysControl = layout.controls.get("KolDays");
                            if (!!daysControl) return [3 /*break*/, 3];
                            return [4 /*yield*/, messageBoxSvc.showError('Контрол "Количество дней" не найден!')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 3:
                            daysValue = daysControl.params.value;
                            if (!(daysValue === null || daysValue === undefined || daysValue === 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, messageBoxSvc.showWarning('Поле "Количество дней" обязательно для заполнения!')];
                        case 4:
                            _a.sent();
                            return [2 /*return*/, false]; // Отменяем сохранение
                        case 5:
                            if (!(daysValue < 1)) return [3 /*break*/, 7];
                            return [4 /*yield*/, messageBoxSvc.showWarning('Количество дней должно быть больше 0!')];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/, true];
                        case 8:
                            error_1 = _a.sent();
                            console.error('Ошибка при проверке перед сохранением:', error_1);
                            return [4 /*yield*/, messageBoxSvc.showError('Ошибка при проверке данных')];
                        case 9:
                            _a.sent();
                            return [2 /*return*/, false];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        ApplicationLogic.prototype.sendSavingMsg = function (layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, layout.getService($MessageBox.$MessageBox).showInfo('Карточка сохраняется...')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ApplicationLogic.prototype.sendSavedMsg = function (layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, layout.getService($MessageBox.$MessageBox).showInfo('Карточка успешно сохранена!')];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ApplicationLogic.prototype.validateDateRange = function (sender) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var layout, messageBoxSvc, startDateControl, endDateControl, startDateValue, endDateValue, startDate, endDate, error_2;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            layout = sender.layout;
                            messageBoxSvc = layout.getService($MessageBox.$MessageBox);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 8]);
                            startDateControl = layout.controls.get("StartDate");
                            endDateControl = layout.controls.get("EndDate");
                            if (!(!startDateControl || !endDateControl)) return [3 /*break*/, 3];
                            return [4 /*yield*/, messageBoxSvc.showError('Контролы дат не найдены!')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            startDateValue = startDateControl.value;
                            endDateValue = endDateControl.value;
                            if (!(startDateValue && endDateValue)) return [3 /*break*/, 5];
                            startDate = new Date(startDateValue);
                            endDate = new Date(endDateValue);
                            if (!(endDate <= startDate)) return [3 /*break*/, 5];
                            return [4 /*yield*/, messageBoxSvc.showError('Дата окончания должна быть больше даты начала!')];
                        case 4:
                            _a.sent();
                            // Сбрасываем значение контрола, который вызвал изменение
                            sender.value = null;
                            _a.label = 5;
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            error_2 = _a.sent();
                            console.error('Ошибка при валидации дат:', error_2);
                            return [4 /*yield*/, messageBoxSvc.showError('Ошибка при проверке дат')];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        // ========== ЛОГИКА ОТОБРАЖЕНИЯ ИНФОРМАЦИИ ==========
        ApplicationLogic.prototype.showCardInfo = function (layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var messageBoxSvc, documentNameControl, regDateControl, startDateControl, endDateControl, reasonControl, lines, message, error_3;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!layout) {
                                return [2 /*return*/];
                            }
                            messageBoxSvc = layout.getService($MessageBox.$MessageBox);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 5]);
                            documentNameControl = layout.controls.get("documentName");
                            regDateControl = layout.controls.get("regDate");
                            startDateControl = layout.controls.get("StartDate");
                            endDateControl = layout.controls.get("EndDate");
                            reasonControl = layout.controls.get("Reason");
                            lines = [
                                "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438: " + ((documentNameControl === null || documentNameControl === void 0 ? void 0 : documentNameControl.params.value) || 'Не указано'),
                                "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: " + ((regDateControl === null || regDateControl === void 0 ? void 0 : regDateControl.params.value) ?
                                    new Date(regDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'),
                                "\u0414\u0430\u0442\u0430 \u0441: " + ((startDateControl === null || startDateControl === void 0 ? void 0 : startDateControl.params.value) ?
                                    new Date(startDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'),
                                "\u0414\u0430\u0442\u0430 \u043F\u043E: " + ((endDateControl === null || endDateControl === void 0 ? void 0 : endDateControl.params.value) ?
                                    new Date(endDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'),
                                "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0435\u0437\u0434\u043A\u0438: " + (reasonControl.params.value || 'Не указано')
                            ];
                            message = lines.join('\n');
                            return [4 /*yield*/, messageBoxSvc.showInfo(message, "Информация о командировке")];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            error_3 = _a.sent();
                            console.error('Ошибка при отображении информации о карточке:', error_3);
                            return [4 /*yield*/, messageBoxSvc.showError("Произошла ошибка при получении данных")];
                        case 4:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        return ApplicationLogic;
    }());

    // ========== СОХРАНЕНИЕ КАРТОЧКИ ==========
    function ddApplication_OnSaving(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic, isValid;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        return [4 /*yield*/, logic.validateBeforeSave(sender)];
                    case 1:
                        isValid = _a.sent();
                        if (!isValid) {
                            // Отменяем сохранение если проверка не пройдена
                            args.savingCancelled = true;
                            return [2 /*return*/];
                        }
                        console.log('Карточка сохраняется...');
                        return [4 /*yield*/, logic.sendSavingMsg(sender)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function ddApplication_OnSaved(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        return [4 /*yield*/, logic.sendSavedMsg(sender)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // ========== ОБРАБОТКА ДАТ ==========
    function ddDateRange_OnDateChange(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        return [4 /*yield*/, logic.validateDateRange(sender)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    // ========== КНОПКА ИНФОРМАЦИИ ==========
    function ddShowCardInfo_OnClick(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        // Передаем layout вместо sender
                        return [4 /*yield*/, logic.showCardInfo(sender.layout)];
                    case 1:
                        // Передаем layout вместо sender
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }

    var ApplicationEventHandlers = /*#__PURE__*/Object.freeze({
        __proto__: null,
        ddApplication_OnSaving: ddApplication_OnSaving,
        ddApplication_OnSaved: ddApplication_OnSaved,
        ddDateRange_OnDateChange: ddDateRange_OnDateChange,
        ddShowCardInfo_OnClick: ddShowCardInfo_OnClick
    });

    // Регистрация расширения
    ExtensionManager.extensionManager.registerExtension({
        name: "MyWebExtension",
        version: "1.0",
        globalEventHandlers: [ApplicationEventHandlers],
        layoutServices: [],
        controls: []
    });

}));
//# sourceMappingURL=extension.js.map
