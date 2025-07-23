import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { StarRatingComponent } from '../shared/star-rating/star-rating.component';

@Component({
    selector: 'app-article-detail',
    standalone: true,
    imports: [CommonModule, StarRatingComponent],
    templateUrl: './article-detail.component.html',
    styleUrl: './article-detail.component.css'
})
export class ArticleDetailComponent implements OnInit {
    article: Article | undefined;
    selectedImage: string | undefined;
    showImageModal: boolean = false;
    modalImageUrl: string | undefined;
    showPaymentMethodsModal: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private articleService: ArticleService
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.articleService.getArticleById(id).subscribe(article => {
                this.article = article;
                if (this.article.images.length > 0) {
                    this.selectedImage = this.article.images[0].large;
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


