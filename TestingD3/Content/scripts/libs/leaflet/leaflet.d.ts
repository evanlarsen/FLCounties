
interface ILatLng {
    new(latidue: number, longitude: number): ILatLng;
    lat: number;
    lng: number;
    distanceTo(otherLatLng: ILatLng): number;
    equals(otherLatLng: ILatLng): bool;
    toString(): string;
    wrap(left: number, right: number): ILatLng;
}

interface ILatLngBounds {
    new(southWest: ILatLng, northEast: ILatLng): ILatLngBounds;
    new(latlngs: ILatLng[]): ILatLngBounds;
    extend(latlng: ILatLng): ILatLngBounds;
    extend(latlng: ILatLngBounds): ILatLngBounds;
    getSouthWest(): ILatLng;
    getNorthEast(): ILatLng;
    getNorthWest(): ILatLng;
    getSoutEast(): ILatLng;
    getCenter(): ILatLng;
    contains(otherBounds: ILatLngBounds): bool;
    contains(latlng: ILatLng): bool;
    intersects(otherBounds: ILatLngBounds): bool;
    equals(otherBounds: ILatLngBounds): bool;
    toBBoxString(): string;
    pad(bufferRatio: number): ILatLngBounds;
    isValid(): bool;
}

interface IMapStateOptions {
    center?: ILatLng;
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    maxBounds?: ILatLngBounds;
}

interface IMapInteractionOptions {
    dragging?: bool;
    touchZoom?: bool;
    scrollWheelZoom?: bool;
    doubleClickZoom?: bool;
    boxZoom?: bool;
    trackResize?: bool;
    worldCopyJump?: bool;
    closePopupOnClick?: bool;
}

interface IMapKeyboardNavigationOptions {
    keyboard?: bool;
    keyboardPanOffset?: number;
    keyboardZoomOffset?: number;
}

interface IMapPanningInertiaOptions {
    inertia?: bool;
    inertiaDeceleration?: number;
    inertiaMaxSpeed?: number;
    inertiaThreshold?: number;
}

interface IMapControlOptions {
    zoomControl?: bool;
    attributionControl?: bool;
}

interface IMapAnimationOptions {
    fadeAnimation?: bool;
    zoomAnimation?: bool;
    markerZoomAnimation?: bool;
}

interface IMapOptions extends 
    IMapStateOptions, 
    IMapInteractionOptions, 
    IMapKeyboardNavigationOptions,
    IMapPanningInertiaOptions,
    IMapControlOptions,
    IMapAnimationOptions
{
}

interface IMouseEvent {
    latlng: ILatLng;
    layerPoint: IPoint;
    containerPoint: IPoint;
    originalEvent: MouseEvent;
}

interface IMapEvents {
    click: (e: IMouseEvent) => void;

}

interface IPoint {
    (x: number, y: number, round?: bool): IPoint;
    x: number;
    y: number;
    add(otherPoint: IPoint): IPoint;
    subtract(otherPoint: IPoint): IPoint;
    multiplyBy(number: number): IPoint;
    divideBy(number: number, round?: bool): IPoint;
    distanceTo(otherPoint: IPoint): number;
    clone(): IPoint;
    round(): IPoint;
    equals(otherPoint: IPoint): bool;
    toString(): string;
}

interface ILocateOptions {
    watch: bool;
    setView: bool;
    maxZoom: number;
    timeout: number;
    maximumAge: number;
    enableHighAccuracy: bool;
}

interface IModifyMapState {
    setView(center: ILatLng, zoom: number, forceReset?: bool): IMap;
    setZoom(zoom: number): IMap;
    zoomIn(delta?: number): IMap;
    zoomOut(delta?: number): IMap;
    fitBounds: {
        (bounds: ILatLngBounds): IMap;
        (bounds: number[]): IMap;
    };
    fitWorld(): IMap;
    panTo(latlng: ILatLng): IMap;
    panInsideBounds: {
        (bounds: ILatLngBounds): IMap;
        (bounds: number[]): IMap;
    };
    panBy(point: IPoint): IMap;
    invalidateSize(animate?: bool): IMap;
    setMaxBounds: {
        (bounds: ILatLngBounds): IMap;
        (bounds: number[]): IMap;
    };
    locate(options?: ILocateOptions): IMap;
    stopLocate(): IMap;
}

interface IMethodsForGettingMapState {
    getCenter(): ILatLng;
    getZoom(): number;
    getMinZoom(): number;
    getMaxZoom(): number;
    getBounds(): ILatLngBounds;
    getBoundsZoom: {
        (bounds: ILatLngBounds, inside?: bool): number;
        (bounds: number[], inside?: bool): number;
    };
    getSize(): IPoint;
    getPixelBounds(): any;
    getPixelOrigin(): IPoint;
}

interface IMap extends 
    IModifyMapState, 
    IMapOptions,
    IMethodsForGettingMapState
{
    new (container: string, options?: IMapOptions): IMap;
    new (container: HTMLElement, options?: IMapOptions): IMap;
}

interface ITileLayerOptions {
    minZoom?: number;
    maxZoom?: number;
    tileSize?: number;
    subdomains?: string[];
    errorTileUrl?: string;
    attribution?: string;
    tms?: bool;
    continuousWorld?: bool;
    noWrap?: bool;
    zoomOffset?: number;
    zoomReverse?: bool;
    opacity?: number;
    zIndex?: number;
    unloadInvisibleTiles?: bool;
    updateWhenIdle?: bool;
    detectRetina?: bool;
    reuseTiles?: bool;
}

interface IEvent {
    type: string;
    target: Object;
}

interface ITileLayerEvents {
    loading: (e: IEvent) => void;
    load: (e: IEvent) => void;
    tileload: (e: IEvent) => void;
    tileunload: (e: IEvent) => void;
}

interface ITileLayerMethods {
    addTo(map: IMap): ITileLayer;
    bringToFront(): ITileLayer;
    bringToBack(): ITileLayer;
    setOpacity(opacity: number): ITileLayer;
    setZIndex(zIndex: number): ITileLayer;
    redraw(): ITileLayer;
    setUrl(urlTemplate: string): ITileLayer;
}

interface ITileLayer extends
    ITileLayerOptions,
    ITileLayerEvents,
    ITileLayerMethods
{
    new (urlTemplate: string, options?: ITileLayerOptions): ITileLayer;
}

interface IControlOptions {
    position?: string;
}

interface IControlMethods {
    setPosition(position: string): IControl;
    getPosition(): string;
    addTo(map: IMap): IControl;
    removeFrom(map: IMap): IControl;
}

interface IControl extends 
    IControlMethods,
    IControlOptions
{
    new (options?: IControlOptions): IControl;
    onAdd(map: IMap): HTMLElement;
    onRemove(map: IMap): void;
}

interface IDomUtil {
    create(tagName: string, className: string, container?: HTMLElement): HTMLElement;
}

interface ILeaflet {
    Map: IMap;
    map: IMap;
    LatLng: ILatLng;
    latLng: ILatLng;
    LatLngBounds: ILatLngBounds;
    latLngBounds: ILatLngBounds;
    TileLayer: ITileLayer;
    tileLayer: ITileLayer;
    control: IControl;
    Control: IControl;
    DomUtil: IDomUtil;
}

declare var L: ILeaflet;