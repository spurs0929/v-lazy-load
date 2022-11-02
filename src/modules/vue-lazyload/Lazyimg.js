import { imgLoad } from "./utils";

export default class LazyImg{
  constructor({ el, src, options, imgRender }){
    this.el = el;
    this.src = src;
    this.options = options;
    // 圖片渲染
    this.imgRender = imgRender;
    // 圖片加載?
    this.loaded = false;

    this.state = {
      loading: false,
      error: false
    }
  }

  // 圖片在可視區域?
  checkIsVisible(){
    const { top } = this.el.getBoundingClientRect();
    return top < window.innerHeight * (this.options.preload || 1.3);
  }

  // 加載圖片
  loadImg(){
    this.imgRender(this, 'loading');

    imgLoad(this.src).then(() => {
      this.state.loading = true;
      this.imgRender(this, 'ok');
      this.loaded = true;
    }, () => {
      this.state.error = true;
      this.imgRender(this, 'error');
      this.loaded = true;
    })    
  }
}