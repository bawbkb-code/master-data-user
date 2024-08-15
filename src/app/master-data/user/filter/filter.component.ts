import { Component } from '@angular/core';
import { ApiService, SearchService } from 'src/app/shared';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent{
  model :any={};
  txtSearchMore: string ="Search More";
  paginationConfig: any;
  subscription: any = {};
  searchResult!: any[];
  constructor(private apiService:ApiService,private searchService: SearchService,){
    this.paginationConfig = {
      currentPage: 1,
      itemsPerPage: 10,
      totalItems: 0,
    };

    this.searchService.setConfig = this.paginationConfig;
  }

  ngOnInit(){
    
    this.subscription.config = this.searchService.config.subscribe((data: any) => {
      this.paginationConfig = data;
    });

    this.subscription.search = this.searchService.searchTrigger.subscribe(() => {
      this.search();
    });
  }

  search(): void {
    let filterModel: any = Object.assign({
      pageNo: this.paginationConfig.currentPage,
      itemPerPage: this.paginationConfig.itemsPerPage,
      sort: this.paginationConfig.sort
    }, this.model);

    this.apiService.post("User/filter", filterModel).subscribe(
      (response: any) => {
        this.searchResult = response;
        this.paginationConfig.totalItems = response.totalItems;
        this.searchService.setResult = this.searchResult;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  swapSearchView(): void {
    this.model.isAdvanceSearch = !this.model.isAdvanceSearch;
    if (this.model.isAdvanceSearch) {
      this.txtSearchMore = "Search Less";
    } else {
      this.txtSearchMore = "Search More";
    }
  }

  searchClick(): void {
    this.paginationConfig.currentPage = 1;
    this.search();
  }

}
