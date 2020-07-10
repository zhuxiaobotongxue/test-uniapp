export default {
  methods: {
    // 初始化下拉选择项的选项数据
    initOpts({
      preField,
      field,
      arr,
    }) {
      this.formInfo[preField][field] = {
        ...this.formInfo[preField][field],
        sources: arr,
        opts: arr.map((item) => item.label),
      };
    },
    // 通用下拉单选方法
    commonChangePicker({
      e,
      preField,
      field,
    }) {
      if (preField) {
        // eslint-disable-next-line
        this.formInfo[preField][field].value = e.detail.value == -1 ? 0 : e.detail.value;
      } else {
        // eslint-disable-next-line
        this.formInfo[field].value = e.detail.value == -1 ? 0 : e.detail.value;
      }
    },
  },
};
