

interface ITopoJson {
    version: string;
    mesh(topology: any, o: any, filter?: string): any;
    object(topology: any, o: any): any;
    neighbors(topology: any, objects: any): any;
}

declare var topojson: ITopoJson;