import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSidepaneComponent } from './blog-sidepane.component';

describe('BlogSidepaneComponent', () => {
  let component: BlogSidepaneComponent;
  let fixture: ComponentFixture<BlogSidepaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSidepaneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSidepaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
