import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

import { SocketService } from '../../chat/socket.service';
import { SecurityService } from '../services/security.service';
import { ChatService } from '../../chat/chat.service';
import { UserDetails } from '../database/user-details';

@Component({
    moduleId: module.id,
    selector: 'mm-navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['navbar.component.css']
})

export class NavbarComponent implements OnInit {
    loggedIn: boolean = false;
    user: any;
    picUrl: SafeResourceUrl;

    constructor(
        private ref: ChangeDetectorRef,
        private socketService: SocketService,
        private securityService: SecurityService,
        private domSanitizer: DomSanitizer,
        private chatService: ChatService) {
    }

    ngOnInit(): void {
        this.user = this.securityService.getCookie('userDetails');
        if(this.user) {
            this.loggedIn = this.securityService.getLoginStatus();
            this.ref.detectChanges();
            if (JSON.parse(this.user).picUrl) {
                this.downloadPic(JSON.parse(this.user).picUrl);
            } else {
                this.downloadAltPic(JSON.parse(this.user).role);
            }
        }
    }

    downloadPic(filename: string) {
        this.chatService.downloadFile(filename)
            .subscribe((res:any) => {
                res.onloadend = () => {
                    this.picUrl = this.domSanitizer.bypassSecurityTrustUrl(res.result);
                    this.ref.detectChanges();
                };
            });
    }

    downloadAltPic(role: string) {
        let fileName: string;
        if (role === 'bot') {
            fileName = 'bot.jpg';
        } else if (role === 'doctor') {
            fileName = 'doc.png';
        } else {
            fileName = 'user.png';
        }
        this.chatService.downloadFile(fileName)
            .subscribe((res:any) => {
                res.onloadend = () => {
                    this.picUrl = this.domSanitizer.bypassSecurityTrustUrl(res.result);
                    this.ref.detectChanges();
                };
            });
    }

    logout() {
        this.securityService.setLoginStatus(false);
        this.socketService.logout(JSON.parse(this.user).id);
        this.securityService.deleteCookie('userDetails');
        this.securityService.deleteCookie('token');
    }

    navbarColor(number: number, color: string) {
        if (number > 800) {
            document.getElementById('navbar').style.backgroundColor = color;
        } else {
            document.getElementById('navbar').style.backgroundColor = color;
        }
    }

}
