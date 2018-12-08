import {async, TestBed} from '@angular/core/testing';
import {MainViewComponent} from './main-view.component';

describe('MainViewComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainViewComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'product-consumption-charts'`, () => {
    const fixture = TestBed.createComponent(MainViewComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('product-consumption-charts');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(MainViewComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to product-consumption-charts!');
  });
});
