import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { ErrorService } from '../../services/error.service';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, RouterModule, StarRatingComponent],
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  errorMessage: string | null = null;

  constructor(private articleService: ArticleService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.getError().subscribe(error => {
      this.errorMessage = error;
    });

    this.articleService.getArticles().subscribe({
      next: articles => {
        this.articles = articles;
      },
      error: () => {
        // El error ya será manejado por el ErrorService
      }
    });
  }
}
