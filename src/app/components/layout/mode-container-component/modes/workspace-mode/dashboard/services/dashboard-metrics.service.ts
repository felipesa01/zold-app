import { Injectable } from "@angular/core";
import { Armadilha } from "../../entities/armadilhas/armadilha.model";
import { Captura } from "../../entities/capturas/captura.model";
import { DashboardTimePoint, DashboardTrocaStats } from "../models/KPI-model";
import { DashboardCriticalTrap } from "../models/ranking-model";
import { DashboardTrocaInterval } from "../models/interval-stats-model";

@Injectable({ providedIn: 'root' })
export class DashboardMetricsService {

  private ONE_DAY = 1000 * 60 * 60 * 24;

  diasEntre(a: number, b: number): number {
    return Math.round((a - b) / this.ONE_DAY);
  }

  calcularIntervalos(datas: number[]) {
    if (datas.length < 2) {
      return { media: 0, min: 0, max: 0 };
    }

    const diffs = datas
      .slice(1)
      .map((d, i) => this.diasEntre(d, datas[i]));

    return {
      media: Math.round(diffs.reduce((a, b) => a + b, 0) / diffs.length),
      min: Math.min(...diffs),
      max: Math.max(...diffs)
    };
  }

  calcularTrocaStats(
    capturas: Captura[],
    armadilhas: Armadilha[],
    tipo: 'REFIL' | 'ATRATIVO'
  ): DashboardTrocaStats {

    const flag = tipo === 'REFIL' ? 'trocaRefil' : 'trocaAtrativo';

    // datas de troca por armadilha
    const porArmadilha = new Map<string, number[]>();

    capturas.forEach(c => {
      if (c[flag]) {
        const ts = new Date(c.data).getTime();
        if (!porArmadilha.has(c.armadilhaId)) {
          porArmadilha.set(c.armadilhaId, []);
        }
        porArmadilha.get(c.armadilhaId)!.push(ts);
      }
    });

    let intervalos: number[] = [];
    let maiorPeriodoAtual = 0;
    let armadilhasSemTroca = 0;
    const hoje = Date.now();

    armadilhas.forEach(a => {
      const datas = porArmadilha.get(a.id);

      if (!datas || datas.length === 0) {
        armadilhasSemTroca++;
        return;
      }

      datas.sort((a, b) => a - b);

      const stats = this.calcularIntervalos(datas);
      if (stats.max > 0) intervalos.push(stats.max);

      const ultimo = datas[datas.length - 1];
      const diasAtual = this.diasEntre(hoje, ultimo);
      maiorPeriodoAtual = Math.max(maiorPeriodoAtual, diasAtual);
    });

    return {
      tipo,
      mediaDias: intervalos.length
        ? Math.round(intervalos.reduce((a, b) => a + b, 0) / intervalos.length)
        : 0,
      menorIntervalo: intervalos.length ? Math.min(...intervalos) : 0,
      maiorIntervalo: intervalos.length ? Math.max(...intervalos) : 0,
      armadilhasSemTroca,
      maiorPeriodoAtual
    };
  }


  calcularRankingCritico(
    capturas: Captura[],
    armadilhas: Armadilha[]
  ): DashboardCriticalTrap[] {

    const hoje = Date.now();
    const ONE_DAY = 1000 * 60 * 60 * 24;

    const porArmadilha = new Map<string, Captura[]>();

    capturas.forEach(c => {
      if (!porArmadilha.has(c.armadilhaId)) {
        porArmadilha.set(c.armadilhaId, []);
      }
      porArmadilha.get(c.armadilhaId)!.push(c);
    });

    return armadilhas.map(a => {
      const caps = porArmadilha.get(a.id) ?? [];

      const refil = caps
        .filter(c => c.trocaRefil)
        .map(c => new Date(c.data).getTime())
        .sort((a, b) => b - a)[0];

      const atrativo = caps
        .filter(c => c.trocaAtrativo)
        .map(c => new Date(c.data).getTime())
        .sort((a, b) => b - a)[0];

      const diasSemRefil = refil
        ? Math.round((hoje - refil) / ONE_DAY)
        : null;

      const diasSemAtrativo = atrativo
        ? Math.round((hoje - atrativo) / ONE_DAY)
        : null;

      const qtdExtravios = caps.filter(c => c.situacaoFisica === 'EXTRAVIADA').length;
      const qtdDerrubadas = caps.filter(c => c.situacaoFisica === 'DERRUBADA').length;

      const score =
        (diasSemRefil ?? 0) * 1.2 +
        (diasSemAtrativo ?? 0) * 1.0 +
        qtdExtravios * 30 +
        qtdDerrubadas * 20;

      return {
        armadilhaId: a.id,
        nome: a.nome,
        regiao: a.regiao,
        diasSemRefil,
        diasSemAtrativo,
        qtdExtravios,
        qtdDerrubadas,
        scoreCriticidade: Math.round(score)
      };
    }).sort((a, b) => b.scoreCriticidade - a.scoreCriticidade);
  }


  calcularIntervalosTroca(
    capturas: Captura[],
    tipo: 'REFIL' | 'ATRATIVO'
  ): DashboardTrocaInterval {

    const flag = tipo === 'REFIL' ? 'trocaRefil' : 'trocaAtrativo';

    const datas = capturas
      .filter(c => c[flag])
      .map(c => new Date(c.data).getTime())
      .sort((a, b) => a - b);

    if (datas.length < 2) {
      return {
        tipo,
        intervalos: [],
        media: 0,
        min: 0,
        max: 0
      };
    }

    const ONE_DAY = 1000 * 60 * 60 * 24;

    const intervalos = datas.slice(1).map((d, i) =>
      Math.round((d - datas[i]) / ONE_DAY)
    );

    return {
      tipo,
      intervalos,
      media: Math.round(intervalos.reduce((a, b) => a + b, 0) / intervalos.length),
      min: Math.min(...intervalos),
      max: Math.max(...intervalos)
    };
  }

  buildTimeSeries(capturas: Captura[]): DashboardTimePoint[] {

    const aggregated = new Map<number, DashboardTimePoint>();

    capturas.forEach(c => {

      const ts = new Date(c.data).getTime();

      const hasEvento = c.trocaRefil || c.trocaAtrativo;
      const hasMedicao = c.situacaoFisica === 'REGULAR';

      // ❗ só ignora se não há NADA relevante
      if (!hasMedicao && !hasEvento) {
        return;
      }

      if (!aggregated.has(ts)) {
        aggregated.set(ts, {
          timestamp: ts,
          numAedes: 0,
          numCulex: 0,
          numOutras: 0,
          numTotal: 0,
        });
      }

      const acc = aggregated.get(ts)!;

      // soma só se houve medição válida
      if (hasMedicao) {
        acc.numAedes += c.numAedes;
        acc.numCulex += c.numCulex;
        acc.numOutras += c.numOutras;
        acc.numTotal += c.numTotal;
      }
    });

    return Array.from(aggregated.values())
      .sort((a, b) => a.timestamp - b.timestamp);
  }

}
