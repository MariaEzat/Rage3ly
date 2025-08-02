import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CSSFilesService {
  constructor() { }

  changeStyle(lang : string) {
    if (lang == 'ar') {
      this.createCssFile('/assets/css/ar.css', 'ArStyle')
      this.createCssFile('/assets/css/bootstrap.rtl.min.css', 'ArBootstrab', false)
      this.removeCssFile('Bootstrab')
    }
    else {
      this.createCssFile('/assets/css/bootstrap.min.css', 'Bootstrab', false)
      this.removeCssFile('ArBootstrab')
      this.removeCssFile('ArStyle')
    }
  }

  createCssFile(href, id, withLastindex: boolean = true) {
    let headTag = document.getElementsByTagName('head')[0] as HTMLHeadElement;
    let existingLink = document.getElementById(id) as HTMLLinkElement;
    if (!existingLink) {
      let newLink = document.createElement('link');
      newLink.rel = 'stylesheet';
      newLink.type = 'text/css';
      newLink.id = id;
      newLink.href = href;
      withLastindex ? headTag.appendChild(newLink) : headTag.insertBefore(newLink, headTag.firstChild);
    }
  }
  removeCssFile(id) {
    let existingLink = document.getElementById(id) as HTMLLinkElement;
    if (existingLink)
      existingLink.parentNode.removeChild(existingLink)
  }
}
