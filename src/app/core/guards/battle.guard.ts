import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { GameService } from "../services/game/game.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BattleGuard implements CanActivate, CanLoad {
  constructor(
    private game: GameService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canDoAnything();
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const canLoad = this.canDoAnything();

    if (!canLoad) {
      this.router.navigate(['/']);
    }

    return true;
  }

  private canDoAnything() {
    return !!this.game.gameMode;
  }
}
