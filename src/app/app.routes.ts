import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleListComponent } from './components/article-list/article-list.component';

export const routes: Routes = [
    { path: 'article/:id', component: ArticleDetailComponent },
    { path: 'article', component: ArticleListComponent }
];
