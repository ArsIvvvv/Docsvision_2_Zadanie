import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { ControllerBase, HttpMethods } from "@docsvision/webclient/System/ControllerBase";
import { IOfficeRequestModel} from "../Model/IOfficeRequestModel";
import { IOfficeService } from "./Interface/IOfficeService";
import { IOfficeNameModel } from "../Model/IOfficeNameModel";
import { IOfficeSumModel } from "../Model/IOfficeSumModel";
import { IOfficeSumRequestModel} from "../Model/IOfficeSumRequestModel";

export class OfficeService extends ControllerBase implements IOfficeService{
    protected controllerName: string = "Office";

    constructor(protected service: $RequestManager){
        super(service);
    }

    ChangeManager(model: IOfficeRequestModel): Promise<IOfficeNameModel>{
        return super.doRequest({

            controller:  this.controllerName,
            action: "GetManagerInfo",
            isApi: true,
            method: HttpMethods.Post,
            data: {model},
            options: {isShowOverlay: true}
        });
    }

    ChangeSum(model: IOfficeSumRequestModel): Promise<IOfficeSumModel>{
        return super.doRequest({

            controller:  this.controllerName,
            action: "GetSumCommander",
            isApi: true,
            method: HttpMethods.Post,
            data: {model},
            options: {isShowOverlay: true}
        });
    }
}
