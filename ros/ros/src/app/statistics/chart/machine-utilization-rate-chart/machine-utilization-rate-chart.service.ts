import { Injectable } from '@angular/core';
import {SERVICE_BASE_ADDR} from '../../../utils/utils';
//import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import {CommonHelper} from '../../../utils/common.helper';
import {MachineUtilizationRateChartModel} from './machine-utilization-rate-chart.model';
import {ProductionChartService} from '../production-chart/production-chart.service';


/**
 * 请求地址
 */
const MACHINECHART_URL = SERVICE_BASE_ADDR + "statistics/ProductionAnalysis/GetMachineUseRate";

@Injectable()
export class MachineUtilizationRateChartService {

    public machineRate;
    public currentDate;

    constructor(private http: Http) {

    }

    getMachineRatechartInfo(date): Promise<any> {
        console.log(date);
        return this.http.get(CommonHelper.getUrl(MACHINECHART_URL) + '&day=' + date).toPromise().then((res: Response) => { return <any>res.json() });
    }

}
