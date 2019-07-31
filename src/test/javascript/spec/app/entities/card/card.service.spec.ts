/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { CardService } from 'app/entities/card/card.service';
import { ICard, Card } from 'app/shared/model/card.model';

describe('Service Tests', () => {
    describe('Card Service', () => {
        let injector: TestBed;
        let service: CardService;
        let httpMock: HttpTestingController;
        let elemDefault: ICard;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(CardService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Card(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', currentDate);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        cardtime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Card', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        cardtime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        cardtime: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Card(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Card', async () => {
                const returnedFromService = Object.assign(
                    {
                        cardId: 'BBBBBB',
                        cardnum: 'BBBBBB',
                        sname: 'BBBBBB',
                        ssex: 'BBBBBB',
                        cardstyle: 'BBBBBB',
                        cardmoney: 'BBBBBB',
                        cardstates: 'BBBBBB',
                        cardtime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        cardtime: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Card', async () => {
                const returnedFromService = Object.assign(
                    {
                        cardId: 'BBBBBB',
                        cardnum: 'BBBBBB',
                        sname: 'BBBBBB',
                        ssex: 'BBBBBB',
                        cardstyle: 'BBBBBB',
                        cardmoney: 'BBBBBB',
                        cardstates: 'BBBBBB',
                        cardtime: currentDate.format(DATE_TIME_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        cardtime: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Card', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});