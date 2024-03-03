export interface ILogin {
    Name:{value:string};
    Email: { value: string };
    Password: { value: string };
}

export interface IToDo {
    id:number,
    todo:string,
    completed:boolean,

}
export interface IWeather {
    base:string,
    clouds:{all:number},
    cod:number,
    coord:{lon:number,lat:number},
    dt:number,
    id:number,
    main:{temp:number,feels_like:number,temp_min:number,temp_max:number,pressure:number,humidity:number},
    name:string,
    rain:{h:number}
}

export interface IPhoto{
    photo:string
}