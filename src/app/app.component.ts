import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ArticleListComponent } from "./components/article-list/article-list.component";
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { HeaderComponent } from "./components/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ErrorNotificationComponent, HeaderComponent, ArticleListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'articles-meli';
}
