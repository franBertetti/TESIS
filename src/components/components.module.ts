import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { SampleComponent } from './sample/sample';
@NgModule({
	declarations: [SampleComponent],
	imports: [],
	exports: [SampleComponent],
	schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class ComponentsModule {}
