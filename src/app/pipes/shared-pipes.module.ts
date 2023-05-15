import { NgModule } from '@angular/core';
import { FilterCategoryPipe } from './filter-category.pipe';
import { FilterTasksPipe } from './filter-tasks.pipe';
import { ChatsPipe } from './chats.pipe';



@NgModule({
  declarations: [
    FilterCategoryPipe,
    FilterTasksPipe,
    ChatsPipe
  ],
  exports: [
    FilterCategoryPipe,
    FilterTasksPipe,
    ChatsPipe
  ]
})
export class SharedPipesModule { }
