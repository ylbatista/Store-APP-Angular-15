import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Directive({
  selector: '[isLogged]'
})
export class IsLoggedDirective {

  //private isLogged = false;
  private subscription!: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private el: ElementRef,
    private authService: AuthService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {

    this.subscription = this.authService.getUserRole().subscribe(
      role => {
        if(role) {
          this.renderer.setStyle (this.el.nativeElement, 'display', 'block');
        } else {
          this.renderer.setStyle(this.el.nativeElement,'display', 'none');
        }
      }
    );

    this.authService.getLogoutSubject().pipe(takeUntil(this.destroy$)).subscribe(() => {
      // Realiza las acciones que quiero al producirse el evento de logout
      // ocultar el botón
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    });

  }
}
