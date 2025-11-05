import { serviceName } from "@docsvision/web/core/services";
import { IOfficeRequestModel } from "../../Model/IOfficeRequestModel";
import { IOfficeNameModel } from "../../Model/IOfficeNameModel";
import { IOfficeSumRequestModel } from "../../Model/IOfficeSumRequestModel";
import { IOfficeSumModel } from "../../Model/IOfficeSumModel";

export interface IOfficeService{
    ChangeManager(model:IOfficeRequestModel): Promise<IOfficeNameModel>
    ChangeSum(model:IOfficeSumRequestModel): Promise<IOfficeSumModel>
}



export type $OfficeService = {activityPlanService: IOfficeService};
export const $OfficeService = serviceName<$OfficeService, IOfficeService>(x=> x.activityPlanService)
