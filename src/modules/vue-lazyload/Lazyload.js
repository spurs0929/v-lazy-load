import LazyImg from "./Lazyimg";
import { getScrollParent } from "./utils";

export default function Lazyload(Vue){

  return class Lazy{
    constructor(options){
      this.options = options;
      this.isScrollAddListener = false;
      this.lazyImgPool = [];
    }

    // 綁定事件處理函數
    bindLazy(el, bindings, vnode){
      Vue.nextTick(() => {
        const scrollParent = getScrollParent(el);
        
        if(scrollParent && !this.isScrollAddListener){
          scrollParent.addEventListener('scroll', this.handleScroll.bind(this), false);
        }

        const lazyImg = new LazyImg({
          el,
          src: bindings.value,
          options: this.options,
          imgRender: this.imgRender.bind(this)
        });

        this.lazyImgPool.push(lazyImg);
        this.handleScroll();
      });
    }

    // 加載可視區域內的圖片
    handleScroll(){
      let isVisible = false;

      this.lazyImgPool.forEach(lazyImg => {
        if(!lazyImg.loaded){
          isVisible = lazyImg.checkIsVisible();
          isVisible && lazyImg.loadImg();
        }
      })
    }

    // 圖片渲染
    imgRender(lazyImg, state){
      const { el, options } = lazyImg;
      const { loading, error } = options;
      let src = '';
      
      switch(state){
        case 'loading':
          src = loading || '';  
          break;
        case 'error':
          src = error || '';
          break;
        default:
          src = lazyImg.src;
          break;    
      }

      el.setAttribute('src', src);
    }
  }
}

