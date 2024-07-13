import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { BlogPostService } from 'src/app/_services/blog/blog-post.service';
import { OffreService } from 'src/app/_services/offre/offre.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('likesChart') likesChartRef: ElementRef;
  @ViewChild('dislikesChart') dislikesChartRef: ElementRef;
  @ViewChild('commentsChart') commentsChartRef: ElementRef;

  likesChart: Chart;
  dislikesChart: Chart;
  commentsChart: Chart;
  ordersChart
  blogPosts: any[];

  constructor(private blogPostService: BlogPostService,private offreService: OffreService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    this.loadBlogPosts();
    this.loadDailyOffersData();

  }

  loadBlogPosts(): void {
    this.blogPostService.getAllBlogPosts().subscribe((data: any[]) => {
      this.blogPosts = data;
      this.fetchCountsForBlogPosts();
    });
  }

  fetchCountsForBlogPosts(): void {
    let remainingPosts = this.blogPosts.length;

    this.blogPosts.forEach(post => {
      this.blogPostService.getCommentsCount(post.id).subscribe(count => {
        post.commentsCount = count;
        this.checkAllCountsFetched(--remainingPosts);
      });
      this.blogPostService.getLikesCounts(post.id).subscribe(count => {
        post.likesCount = count;
        this.checkAllCountsFetched(--remainingPosts);
      });
      this.blogPostService.getDislikesCounts(post.id).subscribe(count => {
        post.dislikesCount = count;
        this.checkAllCountsFetched(--remainingPosts);
      });
    });
  }

  checkAllCountsFetched(remainingPosts: number): void {
    if (remainingPosts <= 0) {
      this.updateCharts();
    }
  }

  updateCharts(): void {
    this.initializeLikesChart();
    this.initializeDislikesChart();
    this.initializeCommentsChart();
  }

  initializeLikesChart(): void {
    const likesChartData = this.blogPosts.map(post => ({
      label: post.title,
      data: post.likesCount,
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }));

    this.likesChart = new Chart(this.likesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: likesChartData.map(item => item.label),
        datasets: [{
          label: 'Likes',
          data: likesChartData.map(item => item.data),
          backgroundColor: likesChartData.map(item => item.backgroundColor),
          borderColor: likesChartData.map(item => item.borderColor),
          borderWidth: likesChartData.map(item => item.borderWidth)
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  initializeDislikesChart(): void {
    const dislikesChartData = this.blogPosts.map(post => ({
      label: post.title,
      data: post.dislikesCount,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }));

    this.dislikesChart = new Chart(this.dislikesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: dislikesChartData.map(item => item.label),
        datasets: [{
          label: 'Dislikes',
          data: dislikesChartData.map(item => item.data),
          backgroundColor: dislikesChartData.map(item => item.backgroundColor),
          borderColor: dislikesChartData.map(item => item.borderColor),
          borderWidth: dislikesChartData.map(item => item.borderWidth)
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  initializeCommentsChart(): void {
    const commentsChartData = this.blogPosts.map(post => ({
      label: post.title,
      data: post.commentsCount,
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    }));

    this.commentsChart = new Chart(this.commentsChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: commentsChartData.map(item => item.label),
        datasets: [{
          label: 'Comments',
          data: commentsChartData.map(item => item.data),
          backgroundColor: commentsChartData.map(item => item.backgroundColor),
          borderColor: commentsChartData.map(item => item.borderColor),
          borderWidth: commentsChartData.map(item => item.borderWidth)
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  loadDailyOffersData() {
    this.offreService.getAllOffres().subscribe(data => {
      const dailyOffers = this.processDailyOffersData(data);
      this.initializeChart(dailyOffers);
    });
  }

  processDailyOffersData(data: any[]): { dates: string[], counts: number[] } {
    const offersByDate = {};

    data.forEach(offer => {
      const date = new Date(offer.createDate).toLocaleDateString();
      if (!offersByDate[date]) {
        offersByDate[date] = 0;
      }
      offersByDate[date]++;
    });

    const dates = Object.keys(offersByDate);
    const counts = dates.map(date => offersByDate[date]);

    return { dates, counts };
  }

  initializeChart(data: { dates: string[], counts: number[] }) {
    const chartOrders = document.getElementById('chart-orders') as HTMLCanvasElement;

    const chartData = {
      labels: data.dates,
      datasets: [{
        label: 'Daily Offers',
        data: data.counts,
        backgroundColor: '#fb6340'
      }]
    };

    const chartOptions = {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    this.ordersChart = new Chart(chartOrders, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  }
}
