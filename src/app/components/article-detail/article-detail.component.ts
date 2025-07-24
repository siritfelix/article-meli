import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { ErrorService } from '../../services/error.service';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';

@Component({
    selector: 'app-article-detail',
    standalone: true,
    imports: [CommonModule, StarRatingComponent],
    templateUrl: './article-detail.component.html',
    styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {
    article: Article | undefined;
    selectedImage: string | undefined;
    showImageModal: boolean = false;
    modalImageUrl: string | undefined;
    showPaymentMethodsModal: boolean = false;
    errorMessage: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private errorService: ErrorService
    ) { }

    ngOnInit(): void {
        this.errorService.getError().subscribe(error => {
            this.errorMessage = error;
        });

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.articleService.getArticleById(id).subscribe({
                next: article => {
                    this.article = article;
                    if (this.article.images.length > 0) {
                        this.selectedImage = this.article.images[0].large;
                    }
                },
                error: () => {
                    // El error ya será manejado por el ErrorService
                }
            });
        }
    }

    selectImage(imageUrl: string): void {
        this.selectedImage = imageUrl;
    }
    openImageModal(imageUrl: string | undefined): void {
        this.modalImageUrl = imageUrl;
        this.showImageModal = true;
    }

    closeImageModal(): void {
        this.showImageModal = false;
        this.modalImageUrl = undefined;
    }

    openPaymentMethodsModal(): void {
        this.showPaymentMethodsModal = true;
    }

    closePaymentMethodsModal(): void {
        this.showPaymentMethodsModal = false;
    }
}
