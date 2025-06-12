import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TimeCounter {
  years: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

@Component({
  selector: 'app-love-counter',
  imports: [CommonModule],
  templateUrl: './love-counter.component.html',
  styleUrls: ['./love-counter.component.css']
})
export class LoveCounter implements OnInit, OnDestroy {
  timeElapsed: TimeCounter | null = null;
  private intervalId: any;
    // Data de início do relacionamento - ALTERE AQUI PARA A DATA CORRETA
  private readonly startDate = new Date('2021-08-26T00:00:00'); // 14 de fevereiro de 2024

  ngOnInit(): void {
    this.updateCounter();
    // Atualiza o contador a cada segundo
    this.intervalId = setInterval(() => {
      this.updateCounter();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private updateCounter(): void {
    const now = new Date();
    const diffInMs = now.getTime() - this.startDate.getTime();
    
    if (diffInMs < 0) {
      // Se a data ainda não chegou
      this.timeElapsed = {
        years: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      return;
    }

    // Calcular a diferença total
    const totalSeconds = Math.floor(diffInMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);
    const totalYears = Math.floor(totalDays / 365);

    // Calcular os valores restantes
    const remainingDays = totalDays - (totalYears * 365);
    const remainingHours = totalHours - (totalDays * 24);
    const remainingMinutes = totalMinutes - (totalHours * 60);
    const remainingSeconds = totalSeconds - (totalMinutes * 60);

    this.timeElapsed = {
      years: totalYears,
      days: remainingDays,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds
    };
  }
}
