import { Component } from '@angular/core';
import NewsAPI from 'newsapi/dist/index.js';
import { StorageService } from '../storage.service';
const newsapi = new NewsAPI('cea50ef689684c3faf641ad2ad03da30');

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public news: any[] = [];

  public newsList: any[] = [];

  public value: string = "";

  constructor(public storageService: StorageService) {
    newsapi.v2.topHeadlines({
      category: 'sports',
      language: 'en',
      country: 'us'
    }).then(response => {
      this.news = response.articles;
      this.newsList = [...this.news];

      this.newsList.map((item)=>{
        this.storageService.get(item.url).then(result => {
          item.like = result;
        });
      }); 
    });
  }

  filterNews(event){
    let value = event.target.value.toLowerCase();
    this.newsList = value !== undefined || value !== ""? this.news.filter((item) => item.title.toLowerCase().includes(value)) :  [...this.news];
  }

  reactToPost(value, url, index) {
    this.newsList[index].like = value;
    this.storageService.set(`${url}`, value);
  }
}
