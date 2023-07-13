<template>
    <div>
        <label>
            <textarea :id="id"></textarea>
        </label>
    </div>
</template>
<script>
    export default {
        name: 'Ckeditor4',
        props: [
            'value',
        ],
        mounted() {
            const self = this;
            // 渲染编辑器
            self.ckeditor = window.CKEDITOR.replace(self.id);
            // 设置初始内容
            self.ckeditor.setData(self.value);
            // 监听内容变更事件
            self.ckeditor.on('change', function(event) {
                self.$emit('input', self.ckeditor.getData());
            });
        },
        data(){
            return {
                id: parseInt(Math.random() * 10000).toString(),
                ckeditor: null,
            }
        },
        watch: {
            // 监听prop的变化，更新ckeditor编辑值
            value: function() {
                if (this.value !== this.ckeditor.getData()) {
                    // this.ckeditor.setData(this.value);
                    // 反向拿到编辑内容
                    this.value = this.ckeditor.getDate();
                }
            }
        },
        methods:{
            set(val){
                this.ckeditor.setData(val);
            },
            get(){
                return this.ckeditor.getData();
            }
        },
        // 销毁组件前，销毁编辑器
        beforeDestroy: function() {
            this.ckeditor.destroy()
        }
    }
</script>