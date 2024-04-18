<template>
    <div class="splitContent">
        <div class=""><span class="splitspoan">分割前：</span><div class="beforePageing"></div></div>
        <!-- <div class="after"><span class="splitspoan">分割后：</span><div class="pageingContainer"></div></div> -->
    </div>
   
</template>

<script>
import splitHTMLString from './utils/calcText'
import {htmlText} from './utils/const' 
export default {
    data(){
        return{
            beforePageing:''
        }
    },
    mounted(){
        setTimeout(() => {
            this.init()
        }, 100);
    },
    methods:{
        init(){
           console.log( splitHTMLString(htmlText,100),'json')
            this.getBeforePageing()
        },
        getBeforePageing(){
           const beforePageing= document.querySelector('.beforePageing')
           console.log(beforePageing,'beforePageing')
           beforePageing.innerHTML=htmlText
        }
    }
}
</script>

<style lang="scss">
.splitspoan{
    font-size: 16px;
    font-weight: bold;
    color: red;
}
.pageingContainer{
    width: 300px;
    height: 200px;
}
.after{
    margin-top: 20px;
}
.text-container {
    width: 300px;
    height: 200px;
    border: 1px solid black; /* 仅用于标示容器边界 */
    overflow: hidden;
  }
  .hidden-measure {
    position: absolute;
    visibility: hidden;
    width: 300px;
  }
</style>