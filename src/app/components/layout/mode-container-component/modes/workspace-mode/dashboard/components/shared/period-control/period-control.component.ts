import { AfterViewInit, Component, computed, ElementRef, output, signal, ViewChild } from '@angular/core';
import { PeriodInterval } from '../../../models/period-interval-model';
import monthSelectPlugin, { MonthElement } from 'flatpickr/dist/plugins/monthSelect'
import flatpickr from 'flatpickr';
import { Portuguese } from "flatpickr/dist/l10n/pt.js"
import { MatIconModule } from '@angular/material/icon';
import { OptionInterval, IntervalMode } from '../../../models/period-interval-model';
import { CommonModule } from '@angular/common';




@Component({
    selector: 'app-period-control',
    standalone: true,
    imports: [MatIconModule, CommonModule],
    templateUrl: './period-control.component.html',
    styleUrl: './period-control.component.css'
})




export class PeriodControlComponent implements AfterViewInit {

    OPTIONS_DATA: OptionInterval[] = [
        { nome: 'Todos', modo: 'all' },
        { nome: 'Último mês', modo: '1mes' },
        { nome: 'Últimos 3 meses', modo: '3meses' },
        { nome: 'Último semestre', modo: '6meses' },
        { nome: 'Há um ano', modo: '1ano' },
        { nome: 'Personalizado', modo: 'custom' }
    ];

    @ViewChild('mesInicioInput') mesInicioInput!: ElementRef;
    @ViewChild('mesFimInput') mesFimInput!: ElementRef;


    mesInicio = signal<Date | undefined>(undefined);
    mesFim = signal<Date | undefined>(undefined);

    periodoChange = output<{ period: PeriodInterval, periodLabel?: string }>();

    optionSelected = signal<OptionInterval | undefined>(undefined)

    constructor() { }

    periodoTitulo = computed(() => {
        const inicio = this.mesInicio()
        const fim = this.mesFim()

        if (inicio && !fim) {
            return `A partir de ${this.formatMes(inicio)}`
        }

        if (!inicio && fim) {
            return `Até ${this.formatMes(fim)}`
        }

        if (inicio && fim) {
            if (this.formatMes(inicio) == this.formatMes(fim)) {
                return `${this.formatMes(inicio)}`
            }
            return `${this.formatMes(inicio)} – ${this.formatMes(fim)}`
        }
        return ''
    })

    formatMes(date: Date) {

        return date.toLocaleDateString('pt-BR', {
            month: 'long',
            year: 'numeric'
        })

    }


    ngAfterViewInit(): void {
        flatpickr(this.mesInicioInput.nativeElement, {
            "locale": Portuguese,
            wrap: true,
            plugins: [
                monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "m/Y",
                    altFormat: "M Y"
                })
            ],

            onChange: (selectedDates) => {

                if (selectedDates[0]) {
                    const d = selectedDates[0];
                    this.setInicio(d);
                }
                else { this.setInicio(undefined) }

            },


        });

        flatpickr(this.mesFimInput.nativeElement, {
            wrap: true,
            "locale": Portuguese,
            plugins: [
                monthSelectPlugin({
                    shorthand: true,
                    dateFormat: "m/Y",
                    altFormat: "M Y"
                })
            ],

            onChange: (selectedDates) => {

                if (selectedDates[0]) {
                    const d = selectedDates[0];
                    this.setFim(d);
                }
                else { this.setFim(undefined) }

            }

        });
    }

    calcularPeriodo(modo: IntervalMode) {
        this.optionSelected.set(this.OPTIONS_DATA.filter(e => e.modo == modo)[0])
        const hoje = new Date();
        var fim: Date | undefined;
        var inicio: Date | undefined;

        if (modo == 'all') {
            console.log('all')
            inicio = undefined;
            fim = undefined;
        }
        else if (modo == 'custom') {
            this.mesInicio.set(undefined)
            this.mesFim.set(undefined)
            inicio = this.mesInicio()!;
            fim = this.mesFim()!
        }
        else {

            fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);
            switch (modo) {
                case '1mes':
                    inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
                    fim = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
                    break;

                case '3meses':
                    inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 2, 1);
                    break;

                case '6meses':
                    inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 5, 1);
                    break;

                case '1ano':
                    inicio = new Date(hoje.getFullYear() - 1, hoje.getMonth(), 1);
                    break;

                default:
                    return;

            }

        }

        // this.mesInicio.set(inicio);
        // this.mesFim.set(fim);
        this.setInicio(inicio)
        this.setFim(fim)

    }

    setInicio(date: Date | undefined) {

        const inicio = date ? new Date(date.getFullYear(), date.getMonth(), 1) : undefined;
        this.mesInicio.set(inicio);
        this.emit();
    }

    setFim(date: Date | undefined) {
        const fim = date ? new Date(date.getFullYear(), date.getMonth() + 1, 0) : undefined;
        this.mesFim.set(fim);
        this.emit();
    }

    private emit() {
        // var result: PeriodInterval = {};
        // result.inicio = this.mesInicio()
        // result.fim = this.mesFim()

        // console.log(result)

        this.periodoChange.emit({ period: { inicio: this.mesInicio(), fim: this.mesFim()}, periodLabel: this.periodoTitulo() });
    }

}