export default {
    data(){
        return{

        }
    },
    mounted(){
        this.watchBus()
    },
    methods:{
        watchBus(){
            this.$bus.$on('rangeStyleChange',val=>{
              console.log('rangeStyleChange',val)
              if(val.size) this.fontSize=val.size+''
              
            })
          },
          handleEvents(type, data) {
            console.log(type, data)
            this.$emit('customEvent', type, data)
          },
    }
}