import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule} from 'ag-grid-angular';
import { AdminModule } from 'app/admin/admin.module';
import { AlertModule} from 'ngx-bootstrap';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { TabsModule} from 'ngx-bootstrap/tabs';
import { NgZorroAntdModule} from 'ng-zorro-antd';

import { FactoryModelTypeComponent } from 'app/system/factory-model-type/factory-model-type.component';
import { FactoryModelComponent } from 'app/system/factory-model/factory-model.component';
import { FactoryModelTypeCreateComponent } from 'app/system/factory-model-type/factory-model-type-create/factory-model-type-create.component';
import { FactoryModelTypeUpdateComponent } from 'app/system/factory-model-type/factory-model-type-update/factory-model-type-update.component';
import { FactoryModelTypeViewComponent } from 'app/system/factory-model-type/factory-model-type-view/factory-model-type-view.component';
import { FactoryModelCreateComponent } from 'app/system/factory-model/factory-model-create/factory-model-create.component';
import { FactoryModelUpdateComponent } from 'app/system/factory-model/factory-model-update/factory-model-update.component';
import { FactoryModelViewComponent } from 'app/system/factory-model/factory-model-view/factory-model-view.component';

@NgModule({
  imports: [
    CommonModule,
    AgGridModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    TabsModule,
    NgZorroAntdModule
  ],
  exports: [

  ],
  entryComponents: [
    FactoryModelTypeComponent,
    FactoryModelComponent,
    FactoryModelTypeCreateComponent,
    FactoryModelTypeUpdateComponent,
    FactoryModelTypeViewComponent,
    FactoryModelCreateComponent,
    FactoryModelUpdateComponent,
    FactoryModelViewComponent
  ],

  declarations: [
    FactoryModelTypeComponent,
    FactoryModelComponent,
    FactoryModelTypeCreateComponent,
    FactoryModelTypeUpdateComponent,
    FactoryModelTypeViewComponent,
    FactoryModelCreateComponent,
    FactoryModelUpdateComponent,
    FactoryModelViewComponent
  ],

})
export class SystemModule { }
