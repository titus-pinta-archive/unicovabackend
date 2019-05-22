import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profitspage',
  templateUrl: './profitspage.component.html',
  styleUrls: ['./profitspage.component.css']
})
export class ProfitspageComponent implements OnInit {
	public barChartOptions: ChartOptions = {
		responsive: true,
		scales: { xAxes: [{}], yAxes: [{}] },
		plugins: {
			datalabels: {
			anchor: 'end',
			align: 'end',
			}
		}
	};
	public barChartLabels: Label[] = [];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [pluginDataLabels];
		
	public barChartData: ChartDataSets[] = [
		{ data: [], label: 'Profit'},
	];

	constructor(
		private http: HttpClient
	) { }

	ngOnInit() {
		let prof:any = this.http.get('/api/profits');
		prof.subscribe(x => {
			x.map(e => {
				this.barChartLabels.push(e.address);
				let d: any = this.barChartData[0].data;
				d.push(e.profit);
			})
		});
  }

}
