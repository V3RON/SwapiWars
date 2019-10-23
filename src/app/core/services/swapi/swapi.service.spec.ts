import { SwapiService } from './swapi.service';
import { createHttpFactory, HttpMethod, SpectatorHttp } from '@ngneat/spectator';
import { environment } from '../../../../environments/environment';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

describe('SwapiService', () => {
  let spectator: SpectatorHttp<SwapiService>;
  const createService = createHttpFactory(SwapiService);

  beforeEach(() => spectator = createService());

  describe('should fetch given', () => {
    it('human', () => {
      spectator.service.getHuman(12).subscribe();
      spectator.expectOne(`${environment.apiUrl}/people/${12}/`, HttpMethod.GET);
    });

    it('starship', () => {
      spectator.service.getStarship(12).subscribe();
      spectator.expectOne(`${environment.apiUrl}/starships/${12}/`, HttpMethod.GET);
    });
  });

  describe('should fetch random', () => {
    it('human', () => {
      const getHumanSpy = spyOn(spectator.service, 'getHuman')
        .and.returnValue(of());

      spectator.service.getRandomHuman().subscribe();
      expect(getHumanSpy).toHaveBeenCalled();
    });

    it('starship', () => {
      const getStarshipSpy = spyOn(spectator.service, 'getStarship')
        .and.returnValue(of());

      spectator.service.getRandomStarship().subscribe();
      expect(getStarshipSpy).toHaveBeenCalled();
    });

    describe('failure handling', () => {
      it('should retry when request failed for human', () => {
        const httpError = new HttpErrorResponse({
          status: 404
        });
        const getHumanSpy = spyOn(spectator.service, 'getHuman')
          .and.returnValues(throwError(httpError), of());

        spectator.service.getRandomHuman().subscribe();
        expect(getHumanSpy).toHaveBeenCalledTimes(2);
      });

      it('should retry when request failed for starship', () => {
        const httpError = new HttpErrorResponse({
          status: 404
        });
        const getHumanSpy = spyOn(spectator.service, 'getStarship')
          .and.returnValues(throwError(httpError), of());

        spectator.service.getRandomStarship().subscribe();
        expect(getHumanSpy).toHaveBeenCalledTimes(2);
      });
    });
  });
});
