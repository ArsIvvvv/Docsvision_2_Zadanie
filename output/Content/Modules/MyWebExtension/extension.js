define(['@docsvision/web/core/services', 'tslib', '@docsvision/webclient/System/$MessageBox', '@docsvision/webclient/Generated/DocsVision.WebClient.Controllers', '@docsvision/webclient/System/ExtensionManager', '@docsvision/webclient/System/ControllerBase'], (function (services, tslib, $MessageBox, DocsVision_WebClient_Controllers, ExtensionManager, ControllerBase) { 'use strict';

    var $OfficeService = services.serviceName(function (x) { return x.activityPlanService; });

    var ApplicationLogic = /** @class */ (function () {
        function ApplicationLogic() {
        }
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
                            return [2 /*return*/, false];
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
        ApplicationLogic.prototype.showCardInfo = function (layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var messageBoxSvc, documentNameControl, regDateControl, startDateControl, endDateControl, reasonControl, cityControl, lines, message, error_3;
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
                            cityControl = layout.controls.tryGet("City");
                            lines = [
                                "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438: " + ((documentNameControl === null || documentNameControl === void 0 ? void 0 : documentNameControl.params.value) || 'Не указано'),
                                "\u0414\u0430\u0442\u0430 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F: " + ((regDateControl === null || regDateControl === void 0 ? void 0 : regDateControl.params.value) ?
                                    new Date(regDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'),
                                "\u0414\u0430\u0442\u0430 \u0441: " + ((startDateControl === null || startDateControl === void 0 ? void 0 : startDateControl.params.value) ?
                                    new Date(startDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'),
                                "\u0414\u0430\u0442\u0430 \u043F\u043E: " + ((endDateControl === null || endDateControl === void 0 ? void 0 : endDateControl.params.value) ?
                                    new Date(endDateControl.params.value).toLocaleDateString('ru-RU') : 'Не указана'),
                                "\u041E\u0441\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0434\u043B\u044F \u043F\u043E\u0435\u0437\u0434\u043A\u0438: " + (reasonControl.params.value || 'Не указано'),
                                "\u0413\u043E\u0440\u043E\u0434: " + ((cityControl === null || cityControl === void 0 ? void 0 : cityControl.params.value.name) || 'Не указан')
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
        ApplicationLogic.prototype.onBusinessTripEmployeeChanged = function (sender, layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var messageBoxSvc, selectedEmployee, response, employeeControl, textControl, employeeController, managerInfo, error_4;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            messageBoxSvc = layout.getService($MessageBox.$MessageBox);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 9]);
                            selectedEmployee = sender.params.value;
                            if (!!(selectedEmployee === null || selectedEmployee === void 0 ? void 0 : selectedEmployee.id)) return [3 /*break*/, 3];
                            return [4 /*yield*/, messageBoxSvc.showWarning('Сотрудник не выбран')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3: return [4 /*yield*/, layout.getService($OfficeService).ChangeManager({
                                documentId: layout.cardInfo.id,
                                employeeId: selectedEmployee.id
                            })];
                        case 4:
                            response = _a.sent();
                            employeeControl = layout.controls.get("staffDirectoryItems1");
                            textControl = layout.controls.get("textBox2");
                            employeeController = layout.getService(DocsVision_WebClient_Controllers.$EmployeeController);
                            return [4 /*yield*/, employeeController.getEmployee(response.name, { isShowOverlay: false })];
                        case 5:
                            managerInfo = _a.sent();
                            employeeControl.params.value = managerInfo;
                            console.log(employeeControl.params.value);
                            if (textControl) {
                                textControl.params.value = response.phone.toString();
                            }
                            return [4 /*yield*/, messageBoxSvc.showInfo('Данные обновлены')];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            error_4 = _a.sent();
                            return [4 /*yield*/, messageBoxSvc.showError('Ошибка: ' + error_4.message)];
                        case 8:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        };
        ApplicationLogic.prototype.onBusinessTripSumChanged = function (sender, layout) {
            return tslib.__awaiter(this, void 0, void 0, function () {
                var cityControl, daysControl, sumControl, selectedCity, daysCount, response;
                return tslib.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            cityControl = layout.controls.get("City");
                            daysControl = layout.controls.get("KolDays");
                            sumControl = layout.controls.get("number2");
                            selectedCity = cityControl.params.value;
                            daysCount = daysControl.params.value;
                            console.log(selectedCity);
                            return [4 /*yield*/, layout.getService($OfficeService).ChangeSum({
                                    city: selectedCity.name,
                                    days: daysCount
                                })];
                        case 1:
                            response = _a.sent();
                            sumControl.params.value = response.sum;
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ApplicationLogic;
    }());

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
                            args.cancel();
                            return [2 /*return*/];
                        }
                        console.log('Карточка сохраняется...');
                        return [4 /*yield*/, logic.sendSavingMsg(sender)];
                    case 2:
                        _a.sent();
                        args.accept();
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
    function ddShowCardInfo_OnClick(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        return [4 /*yield*/, logic.showCardInfo(sender.layout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function ddChangeInfo_OnChangeManager(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        return [4 /*yield*/, logic.onBusinessTripEmployeeChanged(sender, sender.layout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    function ddChangeInfo_OnChangeSum(sender, args) {
        return tslib.__awaiter(this, void 0, void 0, function () {
            var logic;
            return tslib.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logic = new ApplicationLogic();
                        return [4 /*yield*/, logic.onBusinessTripSumChanged(sender, sender.layout)];
                    case 1:
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
        ddShowCardInfo_OnClick: ddShowCardInfo_OnClick,
        ddChangeInfo_OnChangeManager: ddChangeInfo_OnChangeManager,
        ddChangeInfo_OnChangeSum: ddChangeInfo_OnChangeSum
    });

    var OfficeService = /** @class */ (function (_super) {
        tslib.__extends(OfficeService, _super);
        function OfficeService(service) {
            var _this = _super.call(this, service) || this;
            _this.service = service;
            _this.controllerName = "Office";
            return _this;
        }
        OfficeService.prototype.ChangeManager = function (model) {
            return _super.prototype.doRequest.call(this, {
                controller: this.controllerName,
                action: "Change1",
                isApi: true,
                method: ControllerBase.HttpMethods.Post,
                data: { model: model },
                options: { isShowOverlay: true }
            });
        };
        OfficeService.prototype.ChangeSum = function (model) {
            return _super.prototype.doRequest.call(this, {
                controller: this.controllerName,
                action: "Change2",
                isApi: true,
                method: ControllerBase.HttpMethods.Post,
                data: { model: model },
                options: { isShowOverlay: true }
            });
        };
        return OfficeService;
    }(ControllerBase.ControllerBase));

    // Регистрация расширения
    ExtensionManager.extensionManager.registerExtension({
        name: "MyWebExtension",
        version: "1.0",
        globalEventHandlers: [ApplicationEventHandlers],
        layoutServices: [
            services.Service.fromFactory($OfficeService, function (services) { return new OfficeService(services); }),
        ],
        controls: []
    });

}));
//# sourceMappingURL=extension.js.map
