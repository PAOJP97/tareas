import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { AuthenticationServices } from "../authentication/authentication.services";

@Injectable({
   providedIn: "root",
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthenticationServices, private router: Router) {}

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (route.toString().includes('login') || route.toString().includes('signup')) {
        this.authService.setAuthenticated(false);
    }
    if (this.authService.isAuthenticated()) {
        return true;
    } else {
        this.router.navigate(["/login"]);
        return false;
    }
   }
}