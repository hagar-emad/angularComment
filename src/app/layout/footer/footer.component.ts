import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { footer } from 'src/app/_models/footer.model';
import { LayoutFooterService } from 'src/app/_services/layout-footer.service';
import { LocalizationService } from 'src/app/_services/localization.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
footerDetail!:footer[];
  constructor(private Footer:LayoutFooterService,private translate:TranslateService,private localize:LocalizationService) {
    this.translate.use(localize.getLanguage());
   }

  ngOnInit(): void {
    this.footerDetail=this.Footer.getAllFooter();
  }


  changeLanguage() {
    window.location.reload();
    this.localize.setLanguage(this.localize.getLanguage() == 'ar' ? 'en' : 'ar');
    this.translate.use(this.localize.getLanguage());
  }

}
