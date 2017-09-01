import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {SERVICE_BASE_ADDR} from '../../../utils/utils';
import {CommonHelper} from '../../../utils/common.helper';

/**
 * 请求地址
 */
const MACHINERATECHART_URL = SERVICE_BASE_ADDR + "production/ProductionOrder/Statistics";

@Injectable()
export class MachineUsageDetailChartService {

    public machineInfo;

    constructor(private http: Http) { }

    getMachineRatechartInfo(data): Promise<any> {
        console.log(data);

        if (data && data['currentDate'] && data['machine_id']) {
            return this.http.get(CommonHelper.getUrl(MACHINERATECHART_URL) + '&date=' + data['currentDate'] + '&machine_id=' + data['machine_id'])
                .toPromise()
                .then((res: Response) => { return <any>res.json() });
        }

    }

}
