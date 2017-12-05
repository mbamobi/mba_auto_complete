import { ModuleWithProviders, NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';
import { BoldPrefix } from './components/auto-complete/boldprefix.pipe';

export * from './components/auto-complete/auto-complete.component';
export * from './components/auto-complete/boldprefix.pipe';
export * from './components/auto-complete/auto-complete.service';

@NgModule({
    declarations: [AutoCompleteComponent, BoldPrefix],
    imports: [IonicModule],
    exports: [AutoCompleteComponent, BoldPrefix]
})

export class AutoCompleteModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: AutoCompleteModule,
            providers: []
        };
    }
}
