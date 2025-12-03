import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightDirective } from './highlight.directive';

// Componente de teste
@Component({
  template: `
    <div [libHighlight]="highlightColor" 
         [defaultColor]="defaultColor">
      Test Element
    </div>
  `
})
class TestComponent {
  highlightColor = 'yellow';
  defaultColor = '';
}

describe('HighlightDirective com inject()', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let directiveElement: DebugElement;
  let directiveInstance: HighlightDirective;
  let hostElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, HighlightDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(HighlightDirective));
    
    if (!directiveElement) {
      throw new Error('Directive not found');
    }
    
    directiveInstance = directiveElement.injector.get(HighlightDirective);
    hostElement = directiveElement.nativeElement;
    
    fixture.detectChanges();
  });

  it('deve criar uma instância usando inject()', () => {
    expect(directiveInstance).toBeTruthy();
    expect(directiveInstance.libHighlight).toBe('yellow');
  });

  it('deve ter ElementRef injetado corretamente', () => {
    // Verifica se a diretiva tem acesso ao elemento
    const mouseEnterEvent = new MouseEvent('mouseenter');
    hostElement.dispatchEvent(mouseEnterEvent);
    fixture.detectChanges();
    
    expect(hostElement.style.backgroundColor).toBe('yellow');
  });

  it('deve responder ao mouseenter e mouseleave', () => {
    // Testa mouseenter
    const mouseEnterEvent = new MouseEvent('mouseenter');
    hostElement.dispatchEvent(mouseEnterEvent);
    fixture.detectChanges();
    expect(hostElement.style.backgroundColor).toBe('yellow');
    
    // Testa mouseleave
    const mouseLeaveEvent = new MouseEvent('mouseleave');
    hostElement.dispatchEvent(mouseLeaveEvent);
    fixture.detectChanges();
    expect(hostElement.style.backgroundColor).toBe('');
  });

  it('deve usar defaultColor quando fornecida', () => {
    testComponent.defaultColor = 'lightgray';
    fixture.detectChanges();
    
    const mouseLeaveEvent = new MouseEvent('mouseleave');
    hostElement.dispatchEvent(mouseLeaveEvent);
    fixture.detectChanges();
    
    expect(hostElement.style.backgroundColor).toBe('lightgray');
  });
});