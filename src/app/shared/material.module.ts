import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//importaciones material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

import { MatGridListModule } from'@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

import { MatExpansionModule } from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';


@NgModule({

  imports: [

    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatRadioModule,

    CdkTableModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatExpansionModule,
    MatTabsModule,

    HttpClientModule,

    //forms
    FormsModule,
    ReactiveFormsModule,

    MatProgressBarModule


  ],


  exports: [

    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatGridListModule,
    MatExpansionModule,
    MatRadioModule,

    CdkTableModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,


    HttpClientModule,

    //forms
    FormsModule,
    ReactiveFormsModule,

    MatProgressBarModule

  ]
})
export class MaterialModule { }



//
//
//
//
//     MatFormFieldModule,




//     AuthRoutingModule

