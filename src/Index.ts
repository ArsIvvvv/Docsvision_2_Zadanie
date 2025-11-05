
import { Service } from "@docsvision/web/core/services";
import * as ApplicationEventHandlers from "./EventHandlers/ApplicationEventHandlers";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { $OfficeService } from "./Service/Interface/IOfficeService";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { OfficeService } from "./Service/OfficeSevice";

// Регистрация расширения
extensionManager.registerExtension({
    name: "MyWebExtension",
    version: "1.0",
    globalEventHandlers: [ApplicationEventHandlers],
    layoutServices: [
        Service.fromFactory($OfficeService, (services: $RequestManager) => new OfficeService(services)),
    ],
    controls: []
});