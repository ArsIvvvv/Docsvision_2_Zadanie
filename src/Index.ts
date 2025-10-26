
import * as ApplicationEventHandlers from "./EventHandlers/ApplicationEventHandlers";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";

// Регистрация расширения
extensionManager.registerExtension({
    name: "MyWebExtension",
    version: "1.0",
    globalEventHandlers: [ApplicationEventHandlers],
    layoutServices: [],
    controls: []
});