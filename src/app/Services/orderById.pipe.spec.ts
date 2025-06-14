import { Pipe, PipeTransform } from '@angular/core';
import { Coordinate } from './cartellaFinta/coordinate';

@Pipe({
  name: 'orderById',
  standalone: true,
})
export class OrderByIdPipe implements PipeTransform {
  transform(value: Coordinate[]): Coordinate[] {
    return [...value].sort((a, b) => a.id - b.id);
  }
}
