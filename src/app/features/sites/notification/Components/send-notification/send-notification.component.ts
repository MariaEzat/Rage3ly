import { Component, OnDestroy, OnInit } from '@angular/core';
import { CRUDCreatePage } from 'src/app/shared/classes/crud-create.model';
import { Client, sendNotificationViewModel } from '../../interface/notifications';
import { environment } from 'src/environments/environment';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { SharedService } from 'src/app/shared/service/shared.service';
import { NotificationsService } from '../../service/notifications.service';

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css']
})
export class SendNotificationComponent implements OnInit, OnDestroy {
  page: CRUDCreatePage = new CRUDCreatePage();
  item: sendNotificationViewModel = new sendNotificationViewModel();
  id: string;
  isActivated: boolean = false;
  images = [{ uploaded: false, src: null }, { uploaded: false, src: null }];
  private isManualRemove = false;
  environment = environment;
  clientlist: Client[] = [];

  clientId: string = "";
  selectedUsers: any[] = [];
  constructor(
    private _sharedService: SharedService,
    private _notificationsService: NotificationsService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.page.isPageLoaded = false;
    this.onSelectClients();



    this._activatedRoute.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.page.isEdit = true;
      }

      if (params.has('clientId')) {
        this.clientId = params.get('clientId');
      }

      if (this.page.isEdit) {

      } else {
        this.createForm();
      }
    });
  }


  createForm() {
    this.page.form = this._sharedService.formBuilder.group({
      userId: [this.item.userId, [Validators.required]],
      title: [this.item.title, [Validators.required, Validators.maxLength(100)]],
      body: [this.item.body, [Validators.required, Validators.maxLength(500)]],
    });
    this.page.isPageLoaded = true;
  }

  Save() {
    if (this.page.isSaving || this.page.form.invalid) return;
    this.page.isSaving = true;
    Object.assign(this.item, this.page.form.value);


    this._notificationsService.sendNotification(this.item).subscribe({
      next: (res) => {
        this.page.isSaving = false;
        this.page.responseViewModel = res;
        this._sharedService.showToastr(res);
        if (res.isSuccess) {
          this._router.navigate(['/sites/notifications']);
        }
      },
      error: (err) => {
        this._sharedService.showToastr(err);
        this.page.isSaving = false;
      },
    });
  }



  onCancel(): void {
    this._router.navigate(['/sites/notifications']);
  }

  onReset() {
    this.page.form.reset();
    this.isActivated = false;
  }

  onSelectClients() {
    forkJoin([this._notificationsService.getclients()]).subscribe((res) => {
      const clientResponse = res[0];
      if (clientResponse.isSuccess) {
        this.clientlist = clientResponse.data;
        this.createForm();
      }
    });
  }
  ngOnDestroy(): void { }

  numberOnly(event: any) {
    return this._sharedService.numberOnly(event);
  }
  onUserSelectionChange() {
    let selectedIds: string[] = this.page.form.value.userId || [];
  
    if (!this.isManualRemove && selectedIds.length < this.selectedUsers.length) {
      this.page.form.get('userId').setValue(this.selectedUsers.map(u => u.id), { emitEvent: false });
      return;
    }
  
    selectedIds = Array.from(new Set(selectedIds));
    this.page.form.get('userId').setValue(selectedIds, { emitEvent: false });
  
    this.selectedUsers = this.clientlist.filter((client) =>
      selectedIds.includes(client.id)
    );
  
    this.isManualRemove = false;
  }
  
  removeUser(user: any) {
    this.isManualRemove = true;
    const newIds = this.page.form.value.userId.filter((id) => id !== user.id);
    this.page.form.get('userId').setValue(newIds);
    this.onUserSelectionChange();
  }
}