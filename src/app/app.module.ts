import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { FileService } from 'src/services/file.service';
import { BoardLoader } from 'src/services/board-loader.service';
import { HttpClientModule }    from '@angular/common/http';
import { CellComponent } from './cell/cell.component';

@NgModule({
  declarations: [	
    AppComponent,
    GameComponent,
    CellComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [FileService, BoardLoader],
  bootstrap: [AppComponent]
})
export class AppModule { }
