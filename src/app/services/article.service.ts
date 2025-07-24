import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Article } from '../models/article.model';
import { ErrorService } from './error.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiUrl = environment.apiUrl + environment.article;

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.apiUrl).pipe(
            catchError(error => {
                this.errorService.setError(environment.getArticles);
                return throwError(() => error);
            })
        );
    }

    getArticleById(id: string): Observable<Article> {
        return this.http.get<Article>(`${this.apiUrl}/${id}`).pipe(
            catchError(error => {
                this.errorService.setError(environment.getArticleById);
                return throwError(() => error);
            })
        );
    }
}
