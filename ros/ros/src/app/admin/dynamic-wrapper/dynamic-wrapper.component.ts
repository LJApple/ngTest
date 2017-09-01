import { NgModule, Component, Compiler, ViewContainerRef, ViewChild, Input, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'

/**
 * 动态组件容器
 */
@Component({
    selector: 'app-dynamic-wrapper',
    templateUrl: './dynamic-wrapper.component.html',
    styleUrls: ['./dynamic-wrapper.component.scss']
})
export class DynamicWrapperComponent {

    @ViewChild('target', { read: ViewContainerRef }) target;
    @Input() component;
    @Input() isActive;
    cmpRef: ComponentRef<Component>;
    private isViewInitialized: boolean = false; // 是否初始化的标记

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private compiler: Compiler,
        private cdRef: ChangeDetectorRef) { }

    /**
     * 更新组件
     */
    updateComponent() {
        if (!this.isViewInitialized || !this.isActive) {
            return;
        }
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
        let factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.cmpRef = this.target.createComponent(factory)
        this.cdRef.detectChanges();
        this.isViewInitialized = false;
    }

    ngOnChanges() {
        this.updateComponent();
    }

    // 父组件的视图初始完毕
    ngAfterViewInit() {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    ngOnDestroy() {
        console.log('destroy');
        console.log(this.cmpRef);
        if (this.cmpRef) {
            this.cmpRef.destroy();
        }
    }
}
