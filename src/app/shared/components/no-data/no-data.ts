import { Component, OnInit } from '@angular/core';
import { LucideAngularModule, Archive } from 'lucide-angular';

@Component({
  selector: 'app-no-data',
  standalone: true,
  imports: [LucideAngularModule],
  template: `
    <div class="w-full flex-1 h-80 flex items-center justify-center">
      <div class="flex flex-col items-center gap-3">
        <lucide-icon [name]="ArchiveIcon" size="40" color="gray"></lucide-icon>
        <span class="text-4xl font-bold text-main-gray">No Data</span>
      </div>
    </div>
  `,
})
export class NameComponent implements OnInit {
  ArchiveIcon = Archive;
  constructor() {}

  ngOnInit(): void {}
}
