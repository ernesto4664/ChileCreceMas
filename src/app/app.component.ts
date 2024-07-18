import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importa AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showMenu: boolean = false;
  showHeader: boolean = true;
  showHamburgerMenu: boolean = true;
  showBackButton: boolean = false;
  pageTitle: string = 'ChileCreceMas';
  isLoggedIn: boolean = false; // Añade una variable para el estado de sesión

  constructor(
    private platform: Platform,
    private router: Router,
    private location: Location,
    private authService: AuthService // Inyecta AuthService
  ) {
    this.initializeApp();
    this.setupRouteListener();

    // Suscribirse al estado de sesión
    this.authService.isLoggedIn().subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('hybrid')) {
        StatusBar.setStyle({ style: Style.Dark });
        SplashScreen.hide();
      }
    });
  }

  setupRouteListener() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateHeaderVisibilityAndTitle(event.urlAfterRedirects);
      });
  }

  updateHeaderVisibilityAndTitle(url: string) {
    if (url.includes('welcome')) {
      this.showHeader = false;
      this.pageTitle = 'BIENVENIDOS';
      this.showBackButton = false;
    } else if (url.includes('choice')) {
      this.showHeader = false;
      this.pageTitle = 'Elige una Opción';
      this.showBackButton = true;
    } else if (url.includes('login')) {
      this.showHeader = true;
      this.pageTitle = 'Inicia Sesión';
      this.showBackButton = true;
    } else if (url.includes('register')) {
      this.showHeader = true;
      this.pageTitle = 'Registrarse';
      this.showBackButton = true;
    } else if (url.includes('home-guest')) {
      this.showHeader = true;
      this.pageTitle = 'Home Invitado';
      this.showBackButton = true;
    } else if (url.includes('home')) {
      this.showHeader = true;
      this.pageTitle = 'Home';
      this.showBackButton = true;
    } else if (url.includes('noticia')) { 
      this.showHeader = true;
      this.pageTitle = 'Noticia';
      this.showBackButton = true;
    } else if (url.includes('contact-us')) {
      this.showHeader = true;
      this.pageTitle = 'Contacto';
      this.showBackButton = true;
    } else if (url.includes('terminos-condiciones')) {
      this.showHeader = true;
      this.pageTitle = 'Términos y Condiciones';
      this.showBackButton = true;
    } else {
      this.showHeader = true;
      this.pageTitle = 'ChileCreceMas';
      this.showBackButton = false;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  navigateToElectrolineras() {
    this.showMenu = false;
    this.router.navigate(['/electrolineras']);
  }

  navigateTonoticiasall() {
    this.showMenu = false;
    this.router.navigate(['/noticias-all']);
  }

  navigateTocontact() {
    this.showMenu = false;
    this.router.navigate(['/contact-us']);
  }

  navigateToterminos() {
    this.showMenu = false;
    this.router.navigate(['/terminos-condiciones']);
  }

  navigateTomifamilia() {
    this.showMenu = false;
    this.router.navigate(['/mifamilia']);
  }

  navigateToLogin() {
    this.showMenu = false;
    this.router.navigate(['/login']);
  }

  goBack() {
    this.location.back();
  }

  // Método para cerrar sesión
  logout() {
    this.authService.logout();
    this.showMenu = false;
  }

  ngOnInit() {}
}
