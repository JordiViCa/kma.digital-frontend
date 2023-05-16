import { NgModule } from '@angular/core';
import { FilterCategoryPipe } from './filter-category.pipe';
import { FilterTasksPipe } from './filter-tasks.pipe';
import { ChatsPipe } from './chats.pipe';
import { FilterContactPipe } from './filter-contact.pipe';



@NgModule({
  declarations: [
    FilterCategoryPipe,
    FilterTasksPipe,
    ChatsPipe,
    FilterContactPipe
  ],
  exports: [
    FilterCategoryPipe,
    FilterTasksPipe,
    ChatsPipe,
    FilterContactPipe
  ]
})
export class SharedPipesModule { }
