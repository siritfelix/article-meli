import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Article } from '../../models/article.model';
import { ArticleService } from '../../services/article.service';
import { ErrorService } from '../../services/error.service';
import { ArticleDetailComponent } from './article-detail.component';

describe('ArticleDetailComponent', () => {
    let component: ArticleDetailComponent;
    let fixture: ComponentFixture<ArticleDetailComponent>;
    let articleServiceSpy: jasmine.SpyObj<ArticleService>;
    let errorServiceSpy: jasmine.SpyObj<ErrorService>;
    let activatedRouteStub: Partial<ActivatedRoute>;

    beforeEach(async () => {
        const articleServiceMock = jasmine.createSpyObj('ArticleService', ['getArticleById']);
        const errorServiceMock = jasmine.createSpyObj('ErrorService', ['getError', 'setError', 'clearError']);
        const paramMapMock: ParamMap = {
            has: () => true,
            get: () => '1',
            getAll: () => ['1'],
            keys: []
        };
        const activatedRouteSnapshotMock: ActivatedRouteSnapshot = {
            paramMap: paramMapMock,
            queryParamMap: paramMapMock,
            url: [],
            params: {},
            queryParams: {},
            fragment: null,
            data: {},
            outlet: '',
            component: null,
            routeConfig: null,
            root: {} as any,
            parent: null,
            firstChild: null,
            children: [],
            pathFromRoot: [],
            title: undefined,
            toString: () => ''
        };
        activatedRouteStub = { snapshot: activatedRouteSnapshotMock };

        await TestBed.configureTestingModule({
            imports: [ArticleDetailComponent],
            providers: [
                { provide: ArticleService, useValue: articleServiceMock },
                { provide: ErrorService, useValue: errorServiceMock },
                { provide: ActivatedRoute, useValue: activatedRouteStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ArticleDetailComponent);
        component = fixture.componentInstance;
        articleServiceSpy = TestBed.inject(ArticleService) as jasmine.SpyObj<ArticleService>;
        errorServiceSpy = TestBed.inject(ErrorService) as jasmine.SpyObj<ErrorService>;
    });

    it('debería cargar el detalle del artículo correctamente', () => {
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

        articleServiceSpy.getArticleById.and.returnValue(of(mockArticle));
        errorServiceSpy.getError.and.returnValue(of(null));

        fixture.detectChanges();

        expect(component.article).toEqual(mockArticle);
        expect(articleServiceSpy.getArticleById).toHaveBeenCalledWith('1');
    });

    it('debería manejar errores al cargar el detalle del artículo', () => {
        const errorMessage = 'Error al obtener el detalle del artículo';
        articleServiceSpy.getArticleById.and.returnValue(throwError(() => new Error(errorMessage)));
        errorServiceSpy.getError.and.returnValue(of(errorMessage));

        fixture.detectChanges();

        expect(component.errorMessage).toBe(errorMessage);
        expect(articleServiceSpy.getArticleById).toHaveBeenCalledWith('1');
        expect(errorServiceSpy.getError).toHaveBeenCalled();
    });
});
