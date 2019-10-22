import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { getRandomInt } from '../../utils/random.util';
import { HumanSchema, StarshipSchema } from './swapi.schema';
import { Starship } from '../../model/starship.model';
import { Human } from '../../model/human.model';

const MAX_HUMAN_ID = 88;
const MAX_STARSHIP_ID = 43;

@Injectable({
  providedIn: 'root'
})
export class SwapiService {
  constructor(
    private http: HttpClient
  ) {
  }

  getHuman(id: number): Observable<Human> {
    return this.http.get<HumanSchema>(`${environment.apiUrl}/people/${id}/`).pipe(
      map(schema => new Human(schema))
    );
  }

  getStarship(id: number): Observable<Starship> {
    return this.http.get<StarshipSchema>(`${environment.apiUrl}/starships/${id}/`).pipe(
      map(schema => new Starship(schema))
    )
  }

  getRandomHuman(): Observable<Human> {
    const randomId = getRandomInt(1, MAX_HUMAN_ID);
    return this.getHuman(randomId).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          return this.getRandomHuman();
        }

        return throwError(error);
      })
    );
  }

  getRandomStarship(): Observable<Starship> {
    const randomId = getRandomInt(1, MAX_STARSHIP_ID);
    return this.getStarship(randomId).pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 404) {
          return this.getRandomStarship();
        }

        return throwError(error);
      })
    );
  }
}
