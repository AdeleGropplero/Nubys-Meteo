import { Component, ViewEncapsulation } from '@angular/core';
import { KENDO_BUTTONS } from '@progress/kendo-angular-buttons';
import { KENDO_INDICATORS } from '@progress/kendo-angular-indicators';
import { KENDO_LAYOUT } from '@progress/kendo-angular-layout';
import { KENDO_NAVIGATION } from '@progress/kendo-angular-navigation';
import {
  bellIcon,
  cameraIcon,
  fileIcon,
  filePdfIcon,
  folderIcon,
  imageIcon,
  menuIcon,
  SVGIcon,
} from '@progress/kendo-svg-icons';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    KENDO_LAYOUT,
    KENDO_INDICATORS,
    KENDO_NAVIGATION,
    KENDO_BUTTONS,
    KENDO_MENUS,
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
  encapsulation: ViewEncapsulation.None,
})
export class NavBar {
  kendokaAvatar = 'assets/navigation/appbar/kendoka-angular.png';
  public svgFolder: SVGIcon = folderIcon;
  public svgImage: SVGIcon = imageIcon;
  public pdfImage: SVGIcon = filePdfIcon;
  public fileImage: SVGIcon = fileIcon;
  public items: any[] = [
    {
      text: '',
      icon: menuIcon,
      items: [
        { text: 'Item1', icon: bellIcon },
        { text: 'Item2', icon: bellIcon },
        { text: 'Item3', icon: bellIcon },
      ],
    },
  ];
}
