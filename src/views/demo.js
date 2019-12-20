/*
*  @param  dataVal为要导出的数据
*  @param  formatJson函数用于过滤返回数据数组中对应表头标签的数据值
* */

function handleDownload() {
    var title = ''
    var downloadData = []
    var tHeader = []
    var filterVal = []
    import('@/vendor/Export2Excel').then(excel => {
        title = '售前回访数据表';
        downloadData = this.dataVal;
        tHeader = ['资源ID','渠道','来源','客户等级','分配时间','下次提醒日期','主事业顾问'];
        filterVal = ['resource_id','channel_name','source_name','rank','allot_time','next_time','investment_manager_name'];
        if (!downloadData.length) {
            return
        }else{
            const data = this.formatJson(filterVal, downloadData)
            excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: title
            })
        }
    })
}

function formatJson(filterVal, jsonData) {
    return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
            return parseTime(v[j])
        } else {
            return v[j]
        }
    }))
}
