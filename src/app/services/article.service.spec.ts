import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { Article } from '../models/article.model';
import { ArticleService } from './article.service';
import { ErrorService } from './error.service';

describe('ArticleService', () => {
    let service: ArticleService;
    let httpMock: HttpTestingController;
    let errorService: ErrorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ArticleService, ErrorService]
        });
        service = TestBed.inject(ArticleService);
        httpMock = TestBed.inject(HttpTestingController);
        errorService = TestBed.inject(ErrorService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería obtener la lista de artículos correctamente', () => {
        const mockArticles: Article[] = [
            {
                id: 'b9a5f7f8-9a4c-4c7d-8d44-4f5d3a4d2b21',
                title: 'Samsung A15 128 Gb Negro Azulado',
                description: 'Fotografía profesional en tu bolsillo Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados. Además, el dispositivo cuenta con cámara frontal de 13 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas. Experiencia visual increíble Mirá tus series y películas favoritas con la mejor definición a través de su pantalla Super AMOLED de 6.5',
                price: 150000,
                images: [
                    {
                        medium: 'https://http2.mlstatic.com/D_Q_NP_2X_633374-MLA82692302836_032025-R.webp',
                        small: 'https://http2.mlstatic.com/D_Q_NP_2X_633374-MLA82692302836_032025-R.webp',
                        large: 'https://http2.mlstatic.com/D_NQ_NP_2X_633374-MLA82692302836_032025-F.webp'
                    }
                ],
                seller: {
                    name: 'Tienda mi futuro',
                    location: 'Buenos aires',
                    rating: 4.50
                },
                paymentMethods: [
                    {
                        type: 'CARD_DEBIT_VISA',
                        banck: '',
                        dues: 12,
                        image: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg',
                        imageBanck: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg'
                    }
                ],
                rating: 3.5,
                reviews: [
                    {
                        stars: 5,
                        message: 'Muy buen artículo, recomendado.'
                    }
                ],
                stock: 10
            }
        ];

        service.getArticles().subscribe(articles => {
            expect(articles).toEqual(mockArticles);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}${environment.article}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockArticles);
    });

    it('debería manejar errores al obtener la lista de artículos', () => {
        const errorMessage = environment.getArticlesError;
        spyOn(errorService, 'setError');

        service.getArticles().subscribe({
            next: () => fail('Debería haber fallado'),
            error: error => {
                expect(error).toBeTruthy();
            }
        });

        const req = httpMock.expectOne(`${environment.apiUrl}${environment.article}`);
        req.flush('Error', { status: 500, statusText: 'Server Error' });

        expect(errorService.setError).toHaveBeenCalledWith(errorMessage);
    });

    it('debería obtener un artículo por ID correctamente', () => {
        const mockArticle: Article = {
            id: 'b9a5f7f8-9a4c-4c7d-8d44-4f5d3a4d2b21',
            title: 'Samsung A15 128 Gb Negro Azulado',
            description: 'Fotografía profesional en tu bolsillo Descubrí infinitas posibilidades para tus fotos con las 3 cámaras principales de tu equipo. Poné a prueba tu creatividad y jugá con la iluminación, diferentes planos y efectos para obtener grandes resultados. Además, el dispositivo cuenta con cámara frontal de 13 Mpx para que puedas sacarte divertidas selfies o hacer videollamadas. Experiencia visual increíble Mirá tus series y películas favoritas con la mejor definición a través de su pantalla Super AMOLED de 6.5',
            price: 150000,
            images: [
                {
                    medium: 'https://http2.mlstatic.com/D_Q_NP_2X_633374-MLA82692302836_032025-R.webp',
                    small: 'https://http2.mlstatic.com/D_Q_NP_2X_633374-MLA82692302836_032025-R.webp',
                    large: 'https://http2.mlstatic.com/D_NQ_NP_2X_633374-MLA82692302836_032025-F.webp'
                }
            ],
            seller: {
                name: 'Tienda mi futuro',
                location: 'Buenos aires',
                rating: 4.50
            },
            paymentMethods: [
                {
                    type: 'CARD_DEBIT_VISA',
                    banck: '',
                    dues: 12,
                    image: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg',
                    imageBanck: 'https://http2.mlstatic.com/storage/logos-api-admin/312238e0-571b-11e8-823a-758d95db88db-m.svg'
                }
            ],
            rating: 3.5,
            reviews: [
                {
                    stars: 5,
                    message: 'Muy buen artículo, recomendado.'
                }
            ],
            stock: 10
        };

        service.getArticleById('1').subscribe(article => {
            expect(article).toEqual(mockArticle);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}${environment.article}/1`);
        expect(req.request.method).toBe('GET');
        req.flush(mockArticle);
    });

    it('debería manejar errores al obtener un artículo por ID', () => {
        const errorMessage = environment.getArticleByIdError;
        spyOn(errorService, 'setError');

        service.getArticleById('1').subscribe({
            next: () => fail('Debería haber fallado'),
            error: error => {
                expect(error).toBeTruthy();
            }
        });

        const req = httpMock.expectOne(`${environment.apiUrl}${environment.article}/1`);
        req.flush('Error', { status: 404, statusText: 'Not Found' });

        expect(errorService.setError).toHaveBeenCalledWith(errorMessage);
    });
});
