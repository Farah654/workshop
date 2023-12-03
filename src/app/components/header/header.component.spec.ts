import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the main title', () => {
    const titleElement: HTMLElement = fixture.nativeElement.querySelector('h1');
    // console.log('Actual Content:', titleElement.textContent);
    expect(titleElement.textContent).toContain('Forex excahnge');
  });

  it('should render the subheading', () => {
    const subheadingElement: HTMLElement =
      fixture.nativeElement.querySelector('h2');
    expect(subheadingElement.textContent).toContain(
      'check out the current price for a currency pair'
    );
  });
});
