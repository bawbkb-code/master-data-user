import {
  Component,
  OnInit,
  AfterViewInit,
  ViewEncapsulation,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { ApiService, SearchService } from 'src/app/shared';
import { SortEvent, LazyLoadEvent } from 'primeng/api';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TableLazyLoadEvent } from 'primeng/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
})
export class TableListComponent implements OnInit, AfterViewInit {
  searchResult: any = [];
  paginationConfig: any;
  subscription: any = {};
  loading!: boolean;
  private unsubscribe$ = new Subject<void>();
  columns: any[] = [
    {
      field: '',
      name: 'Operation',
    },
    {
      field: 'fullName',
      name: 'Name',
    },
    {
      field: 'phone',
      name: 'Phone',
    },
    {
      field: 'email',
      name: 'Email',
    },
  ];

  constructor(
    private cd: ChangeDetectorRef,
    private apiService: ApiService,
    private searchService: SearchService
  ) {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit(): void {
    this.loading = true;
    this.searchService.config.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data: any) => {
      this.paginationConfig = data;
    });

    this.searchService.result.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((data: any) => {
      this.searchResult = data;
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  confirmBox(item: any): void {
    console.log(item)
    Confirm.show(
      'Are you sure want to remove?',
      'You will not be able to recover this file!',
      'Yes',
      'No',
      () => {
        this.apiService.get('building/delete/' + item.id).subscribe(
          (response: any) => {
            if (response.status) {
              Report.success(
                'Delete Success',
                'Your Building has been deleted successfully!',
                'Okay',
                
                );
              this.loading = true;
              this.paginationConfig.currentPage = 1;
              this.searchService.search();
            }
          },
          (err: any) => {
            Report.failure(
              'Delete Failed',
              'Your Building can not be deleted!',
              'Okay',
              );
            this.loading = true;
            this.paginationConfig.currentPage = 1;
            this.searchService.search();
            console.log(err);
          }
        );
      },
      );
  }

  search(event: TableLazyLoadEvent): void {
    this.loading = true;
    this.paginationConfig.sort = event.multiSortMeta;
    this.searchService.search();
  }

  itemPerPageChange(): void {
    this.loading = true;
    this.paginationConfig.currentPage = 1;
    this.searchService.search();
  }

  pageChange(e: any): void {
    this.loading = true;
    this.paginationConfig.currentPage = e.page + 1;
    this.searchService.search();
  }

}
