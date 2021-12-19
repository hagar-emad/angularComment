import { Component, ElementRef, ViewChild } from '@angular/core';
import { LocalizationService } from './_services/localization.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('hena') hena!:ElementRef
  @ViewChild('hena1') hena1!:ElementRef
  @ViewChild('hena2') hena2!:ElementRef
  title = 'LinkedIn';
  constructor(private localizationService: LocalizationService) {

console.log(this.localizationService.getLanguage());
this.changeLangage(this.localizationService.getLanguage());

  }
  changeLangage(lang: string) {
    console.log("language changed")
    let htmlTag = document.getElementsByTagName("html")[0] as HTMLHtmlElement;
    htmlTag.dir = lang === 'ar' ? 'rtl' : 'ltr';
    htmlTag.lang = lang ;
    this.changeCssFile(lang);


  }
  changeCssFile(lang: String): void {
    let headTag = document.getElementsByTagName("head")[0] as HTMLHeadElement;
    let existingLink = document.getElementById("langCss") as HTMLLinkElement;
    if (lang === 'ar') {
      let bundleName = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.rtl.min.css";

      existingLink.type = "text/css";
      existingLink.crossOrigin = "anonymous";
      existingLink.integrity = "sha384-+qdLaIRZfNu4cVPK/PxJJEy0B0f3Ugv8i482AKY7gwXwhaCroABd086ybrVKTa0q";
      existingLink.href = bundleName;
      console.log("integrity changed")


    } else {
      let bundleName = "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";

      existingLink.rel = "stylesheet";
      existingLink.type = "text/css";
      existingLink.crossOrigin = "anonymous";
      existingLink.integrity = "sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3";
      existingLink.href = bundleName;
      console.log("integrity changed")

    }



  }
}
