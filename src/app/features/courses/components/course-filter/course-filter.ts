import { Component, OnDestroy, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Select } from 'primeng/select';
import { LucideAngularModule, Search, Funnel } from 'lucide-angular';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { TooltipModule } from 'primeng/tooltip';

interface SelectOption {
  name: string;
  code: string;
}

@Component({
  selector: 'app-courses-filter',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, Select, LucideAngularModule, TooltipModule],
  templateUrl: './course-filter.html',
})
export class CoursesFilterComponent implements OnDestroy {
  filterTypes = input<SelectOption[]>([]);
  orderTypes = input<SelectOption[]>([]);

  filtersChanged = output<{
    search: string;
    filter?: string;
    order?: string;
  }>();

  searchTerm = '';
  selectedFilterType?: string;
  selectedOrderType?: string;

  private searchChanged$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  SearchIcon = Search;
  FunnelIcon = Funnel;

  constructor() {
    this.searchChanged$.pipe(debounceTime(400), takeUntil(this.destroy$)).subscribe((term) => {
      this.emitFilters();
    });
  }

  onSearchChange(term: string): void {
    this.searchChanged$.next(term);
  }

  emitFilters(): void {
    this.filtersChanged.emit({
      search: this.searchTerm,
      filter: this.selectedFilterType,
      order: this.selectedOrderType,
    });
  }

  clearFilter(): void {
    this.searchTerm = '';
    this.selectedFilterType = undefined;
    this.selectedOrderType = undefined;
    this.emitFilters();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
