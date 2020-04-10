import { ICoordinates } from "../../Interfaces/ICoordinates";

const clamp = (value : any, min : any, max : any) => Math.min(Math.max(value, min), max)

export class SpatialHashMap {

    width : number;
    height : number;
    grid : object[][];

    constructor(width : number, height : number) {
      this.width = width;
      this.height = height;
  
      this.grid = new Array(width * height).fill(null).map(() => []);
    }
    

    add(position : ICoordinates, data : object) : void {
        
      position.x = clamp(Math.round(position.x), 0, this.width - 1);
      position.y = clamp(Math.round(position.y), 0, this.height - 1);
  
      const index = position.x + position.y * this.width;
      this.grid[index].push(data);
    }
     

    query(position : ICoordinates, radius? : number) : object[] {
      if (radius)
        return this.queryWithRadius(position, radius);
  
      position.x = clamp(Math.round(position.x), 0, this.width - 1);
      position.y = clamp(Math.round(position.y), 0, this.height - 1);
  
      const index = position.x + position.y * this.width;

      return this.grid[index];
    }
  

    queryWithRadius(position : ICoordinates, radius : number) : object[] {

      const left : number = Math.max(Math.round(position.x - radius), 0);
      const right : number = Math.min(Math.round(position.x + radius), this.width - 1);
      const bottom : number = Math.max(Math.round(position.y - radius), 0);
      const top : number = Math.min(Math.round(position.y + radius), this.height - 1);
  
      const result = [];
  
      for (let i = left; i <= right; i++) {

        for (let j = bottom; j <= top; j++) {
            

          const query = this.query({x : i ,y : j} as ICoordinates);

          for (let k = 0; k < query.length; k++) {
            result.push(query[k]);
          }
        }
      }
  
      return result;
    }

    
    clear() : void {
        this.grid.forEach(cell => {
          cell.splice(0);
        });
      }

  }
  