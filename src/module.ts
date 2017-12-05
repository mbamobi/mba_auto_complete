import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutoCompleteComponent } from './components/auto-complete/auto-complete.component';

@NgModule({
  declarations: [
      AutoCompleteComponent
  ],
  imports: [
    IonicPageModule.forChild(AutoCompleteComponent),
  ],
  providers: [
  ],
  exports: [
    AutoCompleteComponent
  ]
})
export class AutoCompleteComponentModule {
}
