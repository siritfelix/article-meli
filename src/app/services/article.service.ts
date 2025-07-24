import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article } from '../models/article.model';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {
    private apiUrl = environment.apiUrl + environment.article;

    constructor(private http: HttpClient) { }

    getArticles(): Observable<Article[]> {
        return this.http.get<Article[]>(this.apiUrl);
    }

    getArticleById(id: string): Observable<Article> {
        return this.http.get<Article>(`${this.apiUrl}/${id}`);
    }
}
