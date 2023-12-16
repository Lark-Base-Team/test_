export const zh = {
  alert: {
    dateAsText: "请先将 Excel 中的日期格式转换为文本",
  },
  button: {
    confirm: "确认",
    cancel: "取消",
    close: "关闭",
    import: "导入",
    autoFill: "自动填充",
    clear: "清空",
    exportConfig: "导出配置",
    importConfig: "导入配置文件",
  },
  guide: "使用指南",
  h: {
    upload: "上传",
    settings: "设置",
    chooseOrCreateFormat: "选择或创建输入格式",
    setLink: "关联设置",
  },
  input: {
    placeholder: {
      chooseField: "查找并选择字段",
      chooseIndex: "查找并选择索引",
      chooseSheet: "选择工作表",
      chooseTable: "选择表格",
      chooseOrCreateFormat: "选择或创建输入格式",
    },
    chooseAsPrimaryKey: "选择作为主键",
  },
  form: {
    label: {
      index: "索引",
      fieldsMap: "字段对应关系",
      sheet: "Excel 工作表",
      inputDateFormat: "输入日期格式",
      example: "例子",
      separator: "分隔符",
      trueValue: "真值",
      falseValue: "假值",
      mode: "模式",
      primaryKey: "主键",
      table: "多维表格目标表",
      allowAdd: "允许向关联表中添加新记录",
      linkTable: "关联表",
      allowAction: "允许操作",
      whenTwoSame: "当两条以上记录相同时",
      saveFirst: "优先保留",
      requestConfig: "请求配置",
      requestMethod: "请求方法",
      requestHeaders: "请求头",
    },
  },
  table: {
    baseField: "多维表格字段",
    excelField: "Excel 字段",
  },
  upload: {
    tip: {
      common: "点击上传文件或拖拽文件到这里",
      em: "拖拽文件到这里",
      fileLimit: "xlsx/xls 文件",
      fileSupport: "支持 xlsx/xls/csv 类型文件",
    },
  },
  mode: {
    append: "批量追加记录",
    mergeDirect: "覆盖原记录",
    compareMerge: "保留原记录",
    merge: "合并记录",
  },
  toolTip: {
    setInputFormat: "设置输入格式",
    setOperator: "设置分隔符",
    setBoolValue: "设置布尔值",
    pleaseReferTo: "请参考",
    indexInfo:
      "索引列：用于标识每条记录，合并记录的依据。在一个多维表格中，每条记录的索引都应该是唯一的。例：身份证号。",
    importInfo: "点击查看导入进度",
    clickToPreview: "点击预览：{name}",
    about: "关于",
    log: "运行日志",
    questions: "常见问题",
    autoField: "自动计算字段",
    notSupportField: "暂不支持字段，仅可作为索引比较，无法写值",
  },
  message: {
    chooseTableFirst: "请先选择一个表格",
    uploadExcelFirst: "请先上传 Excel 文件",
    importSuccess: "导入成功",
    sheetError: "工作表“{sheetName}”格式错误",
    noSheet: "没有找到正确的工作表",
    fileType: "文件类型错误",
    getTableListError: "获取表格列表失败",
    autoFieldNotAllowAdd: "自动计算的字段类型不允许添加新记录",
    notSupportFieldNotAllowAdd: "不支持的字段类型不允许添加新记录",
    noIndex: "合并记录模式必须设置索引",
    indexNoExcelField: "索引字段 [{fields}] 未设置对应 Excel 字段",
    getTableFailure: "获取表格 [{id}] 失败",
    getTableIndexFailure: "获取表格 [{id}] 索引值失败",
    getModifiedTimeFailure: "获取表格 [{id}] 记录修改时间失败",
    autoFieldInIndex:
      "索引包含自动计算字段 [{fields}]，插件将不会向表中添加新记录",
    configTableError: "配置文件与表格不匹配",
    exportSuccess: "导出成功",
  },
  loading: "加载中...",
  fieldType: {
    text: "文本",
    singleSelect: "单选",
    multiSelect: "多选",
    number: "数字",
    dateTime: "日期",
    checkBox: "复选框",
    barCode: "条码",
    rating: "评分",
    currency: "货币",
    progress: "进度",
    phone: "电话号码",
    url: "超链接",
    user: "人员",
    singleLink: "单向关联",
    duplexLink: "双向关联",
    formula: "公式",
    createdTime: "创建时间",
    modifiedTime: "修改时间",
    createdUser: "创建人",
    modifiedUser: "修改人",
    attachment: "附件",
    location: "地理位置",
    autoNumber: "自动编号",
    groupChat: "群组",
    denied: "拒绝",
    notSupport: "不支持",
    email: "Email",
  },
  importInfo: {
    title: "导入进度",
    readFieldMap: "解析字段对应关系配置",
    analyzeRecords: "解析记录",
    updateRecords: "更新记录",
    deleteRecords: "删除记录",
    addRecords: "添加记录",
    updateRecordsMessage: "以 5000条/次 速度更新表 {table} 记录",
    deleteRecordsMessage: "以 5000条/次 速度删除表 {table} 重复记录",
    addRecordsMessage: "以 5000条/次 速度向表 {table} 添加新记录",
    success: "{successNumber} 成功",
    error: "{errorNumber} 失败",
    waiting: "{waitingNumber} 等待",
    analysisRecordsMessage:
      "{updateNumber}更新，{deleteNumber}删除，{addNumber}添加",
    findSameRecord: "正在检索记录 [{indexValue}]，找到 {number} 条相同记录",
    getSameRecord: "正在获取记录 [{indexValue}] 的相同记录 [{recordId}]",
    getLinkRecord:
      "正在检索关联字段 {fieldName}[{fieldId}] 的在 {table} 中的关联记录",
    compareRecordField:
      "正在比对记录 [{indexValue}] 的 {fieldName}[{fieldId}] 字段",
    compareRecord: "正在比对记录 [{indexValue}]",
    analysisRecordField: "正在解析记录 {record} 的 {field} 字段",
    getIndexField: "正在获取索引字段 {name}[{id}]",
    getFieldCellString: "正在获取记录 {record} 的字段 {field} 单元格字符串",
    analyzeIndexFieldValue:
      "正在解析记录 [{recordId}] 索引字段 {fieldName}[{fieldId}] 的值",
    getTable: "正在获取表格 {name}[{id}]",
    getRecordsModifiedTime: "正在获取表格记录修改时间",
    importComplete: "导入完成",
    getTableRecords: "正在获取表格 [{table}] 记录",
    checkSelectFieldOptions:
      "正在检查字段 {fieldName}[FieldId: {fieldId}] 的选项",
    setSelectFieldOptions:
      "字段 {fieldName}[FieldId: {fieldId}] 共有 {newOptionsNum} 个新选项，开始设置",
    asyncData: "获取远程数据",
    createCell: "创建表格 [{tableId}] 字段 [{fieldId}] 单元格",
  },
  allowAction: {
    updateAndAdd: "更新已有记录并添加新记录",
    onlyUpdate: "仅更新已有记录",
    onlyAdd: "仅添加新记录",
  },
  updateMode: {
    saveMost: "保留非空字段最多记录",
    saveLeast: "保留非空字段最少记录",
    saveOldest: "保留最早修改记录",
    saveLatest: "保留最近修改记录",
    whenLastSame: "当前者相同时",
  },
  advancedSetting: {
    advancedSetting: "高级设置",
    parallel: "并行量",
    interval: "间隔时间",
    intervalUnit: "毫秒",
    fields: "字段",
    records: "记录",
    parallelTip: "并行量是同时处理的记录/字段数",
    intervalTip: "间隔时间是每次处理的时间间隔",
  },
}
