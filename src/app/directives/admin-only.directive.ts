import { Directive, ElementRef, OnInit, Renderer2, } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subject, Subscription } from 'rxjs';


@Directive({
  selector: '[adminOnly]'
})
export class AdminOnlyDirective implements OnInit {

 // private isLoggedIn: boolean = false;
  private subscription!: Subscription;
  private destroy$: Subject<void> = new Subject<void>();
  

  constructor(
    private el: ElementRef,
    private authService: AuthService,
    private renderer: Renderer2

  ){}
  
 
  ngOnInit() {

    this.subscription = this.authService.getUserRole().subscribe(
      userRole => {
        if(userRole && userRole === 'ADMIN'){
          this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
        } else {
          this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // this.destroy$.next();
    // this.destroy$.complete();
  }

}