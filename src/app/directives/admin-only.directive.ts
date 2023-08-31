import { rol } from './../interfaces/user.interface';
import { Directive, ElementRef, OnInit, Renderer2, } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';


@Directive({
  selector: '[adminOnly]'
})
export class AdminOnlyDirective implements OnInit {

//  private isLoggedIn: string = '';
  private subscription!: Subscription;
  private destroy$: Subject<void> = new Subject<void>();


  constructor(
    private el: ElementRef,
    private authService: AuthService,
    private renderer: Renderer2

  ){}

  ngOnInit(): void {

    this.subscription = this.authService.getUserRole().subscribe(
      role => {
        if(role === 'ADMIN') {
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
