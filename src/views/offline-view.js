import { html } from 'lit-element';
import '@vaadin/vaadin-button';
import { BaseView } from './base-view.js';

class OfflineView extends (BaseView) {

  constructor(){
    super();

    this.videolink="http://vjs.zencdn.net/v/oceans.mp4";
    this.videoData=this.videolink;
    this._db = new PouchDB("test");
   
  }

  //1st call when template rendering
  firstUpdated(changedProperties) {
    console.log(navigator.onLine);
    //offline video data load if there
    if(!navigator.onLine){
      this.loadOffline();
    }
   }
 
  static get properties() {
    return {
      videolink:{type:String},
      videoData:{type:Object},
      _db: {type: Object}
    };
  }

  stateChanged(state) {
   
  }

  render() {
    return html`
      <div class="input-layout" @keyup="${this.shortcutListener}">
        <video id="player" controls="" preload="auto" src="${this.videoData}" width="400" >Your browser does not support HTML5 video.</video>
        
        <vaadin-button theme="primary" @click="${this.downloadVideo}">
         Download
        </vaadin-button>
      </div>

     <!-- <vaadin-button theme="primary" @click="${this.load}">
      Load Offline Video
     </vaadin-button>-->

    `;
  }

  async loadOffline(){

    let playerElement =this.querySelectorAll("#player");
    console.log(playerElement);

    let data = await this._db.get(this.videolink);
    this.videoData=data.title;
  }

  async downloadVideo() {
    this.loadVideoFromURL(this.videolink)
  }

  createObjectURL(object) {
    return (window.URL) ? window.URL.createObjectURL(object) : window.webkitURL.createObjectURL(object);
  }

  async loadVideoFromURL(videoStream){
  
    let blob = await fetch(videoStream).then(r => r.blob());
    var videoUrl=this.createObjectURL(blob);

    var reader = new FileReader();
    reader.readAsDataURL(blob); 
    var base64data="";
    let _self=this;
 	  reader.onloadend = await function() {
      base64data = reader.result;     
      _self.saveDb(base64data); 
   }
   console.log("base64 converting");
}

async saveDb(base64data){
  let response = await this._db.put({
    _id: this.videolink,
    title: base64data
  });
  console.log("base download");
  alert("Video Downloaded in PouchDb!");
}

}

customElements.define('offline-view', OfflineView);
