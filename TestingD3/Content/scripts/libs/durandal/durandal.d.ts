/// <reference path="../jquery/jquery.d.ts" />
/// <reference path="../knockout/knockout.d.ts" />

declare module "libs/durandal/system" {
    export var getModuleId: (obj: any) => string;
    export var debug: (debug: bool) => void;
    export var isArray: (obj: any) => bool;
    export var log: (...msgs: any[]) => void;
    export var defer: (action?: Function) => JQueryDeferred;
    export var guid: () => string;
    export var acquire: (...modules: string[]) => JQueryPromise;
}

declare module "libs/durandal/app" {
    export var showModal: (viewModel: any) => JQueryPromise;
    export var showMessage: (message: string, title: string, options: any) => JQueryPromise;
    export var start: () => JQueryPromise;
    export var setRoot: (root: any, applicationHost: string) => void;
    export var adaptToDevice: () => void;
}

declare module "libs/durandal/composition" {
    export var activateDuringComposition: bool;
    export var convertTransitionToModuleId: (name: string) => string;
    export var defaultTransitionName: string;
    export var switchContent: (parent: HTMLElement, newChild: HTMLElement, settings: any) => void;
    export var bindAndShow: (element: HTMLElement, view: HTMLElement, settings: any) => void;
    export var defaultStrategy: (settings: any) => JQueryPromise;
    export var getSettings: (valueAccessor: any) => any;
    export var executeStrategy: (element: HTMLElement, settings: any) => void;
    export var inject: (element: HTMLElement, settings: any) => void;
    export var compose: (element: HTMLElement, settings: any, bindingContext: any) => void;
}

declare module "libs/durandal/http" {
    export var defaultJSONPCallbackParam: string;
    export var get: (url: string, query: Object) => JQueryPromise;
    export var jsonp: (url: string, query: Object, callbackParam: string) => JQueryPromise;
    export var post: (url: string, data: Object) => JQueryPromise;
}

declare module "libs/durandal/viewEngine" {
    export var viewExtension: string;
    export var pluginPath: string;
    export var createView: (name: string, markup: string) => HTMLElement;
}

declare module "libs/durandal/viewLocator" {
    export var locateViewForObject: (obj: any) => JQueryPromise;
    export var convertModuleIdToViewUrl: (moduleId: string) => string;
    export var determineFallbackViewUrl: (obj: any) => string;
    export var convertViewUrlToAreaUrl: (area: any, viewUrl: string) => string;
    export var locateView: (viewOrUrl: any, area: string) => JQueryPromise;
}

declare module "libs/durandal/viewModel" {
    export var interpretResponse: (value: any) => bool;
    export var activator: {
        (): IViewModelActiveItem;
        (initialActiveItem: any, settings?: IViewModelDefaults): IViewModelActiveItem;
    }
}

declare module "libs/durandal/viewModelBinder" {
    export var bindContext: (bindingContext: KnockoutBindingContext, view: HTMLElement, obj: any) => void;
    export var bind: (obj: any, view: HTMLElement) => void;
}

interface IViewModelDefaults {
    areSameItem(currentItem, newItem, activationData): bool;
    closeOnDeactivate: bool;
    interpretResponse(value: any): bool;
    beforeActivate(newItem: any): any;
    afterDeactivate(): any;
};

interface IViewModelActiveItem {
    (val?): any;
    settings: IViewModelDefaults;
    isActivating(val?: bool): bool;
    canDeactivateItem(item, close): JQueryPromise;
    deactivateItem(item, close): JQueryDeferred;
    canActivateItem(newItem, activationData): JQueryPromise;
    activateItem(newItem, activationData): JQueryPromise;
    canActivate(): JQueryPromise;
    activate(): JQueryPromise;
    canDeactivate(): JQueryPromise;
    deactivate(): JQueryDeferred;
    includeIn(includeIn: any): JQueryPromise;
    forItems(items): IViewModelActiveItem;
};

interface routeInfo {
    url: string;
    moduleId: string;
    name: string;
    visible: bool;
};

declare module "libs/durandal/plugins/router" {
    export var ready: KnockoutObservableBool;
    export var allRoutes: KnockoutObservableArray;
    export var visibleRoutes: KnockoutObservableArray;
    export var isNavigating: KnockoutObservableBool;
    export var activeItem: IViewModelActiveItem;
    export var afterCompose: () => void;
    export var navigateBack: () => void;
    export var navigateTo: (url: string) => void;
    export var convertRouteToName: (route: string) => string;
    export var convertRouteToModuleId: (url: string) => string;
    export var prepareRouteInfo: (info: routeInfo) => void;
    export var mapAuto: (path?: string) => void;
    export var mapNav: (url: string, moduleId: string, name: string) => routeInfo;
    export var mapRoute: (url: string, moduleId: string, name: string, visible: bool) => routeInfo;
    export var map: (routeOrRouteArray: string) => void;
    export var map: (routeOrRouteArray: string[]) => void;
    export var activate: (defaultRoute: string) => JQueryPromise;
}