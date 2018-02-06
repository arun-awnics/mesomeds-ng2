import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { SharedModule } from '../shared/shared.module';
import { SocketService } from './socket.service';

@NgModule({
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule, ChatRoutingModule],
  declarations: [ChatComponent],
  exports: [ChatComponent],
  providers: [ChatService, SocketService ]
})
export class ChatModule { }