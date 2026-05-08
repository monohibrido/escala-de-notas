import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuNavbar } from './components/menu-navbar/menu-navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, MenuNavbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  notaMinima = signal(1.0);
  notaMaxima = signal(7.0);
  notaAprobacion = signal(4.0);
  exigencia = signal(60);
  puntajeMaximo = signal(100);
  incremento = signal(1);




  escalaCompleta = computed(() => {
    const filas = [];
    const max = this.puntajeMaximo();
    const inc = this.incremento();
    const exig = this.exigencia() / 100;
    const corte = max * exig;

    if (max <= 0 || inc <= 0) return [];

    for (let puntaje = 0; puntaje <= max; puntaje += inc) {
      let nota = 0;
      if (puntaje < corte) {
        nota = (this.notaAprobacion() - this.notaMinima()) * (puntaje / corte) + this.notaMinima();
      } else {
        nota =
          (this.notaMaxima() - this.notaAprobacion()) * ((puntaje - corte) / (max - corte)) +
          this.notaAprobacion();
      }

      filas.push({
        puntaje: puntaje,
        nota: Math.round(nota * 10) / 10,
      });
    }

    return filas.reverse();
  });

  escalaEnGrupos = computed(() => {
    const listaPlana = this.escalaCompleta(); // La que ya teníamos
    const tamañoGrupo = 10;
    const grupos = [];

    for (let i = 0; i < listaPlana.length; i += tamañoGrupo) {
      grupos.push(listaPlana.slice(i, i + tamañoGrupo));
    }
    return grupos;
  });
}
