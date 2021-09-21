export default
`
<div class="ta-box"  >
    <div class="ta-box-title">
    {{title}}
    <div style="float:right;">
        <slot name="tools"></slot>
    </div>
    
    </div>
    <slot></slot>
</div>
`