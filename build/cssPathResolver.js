/**
 * Created by ben on 2017/8/26.
 * 处理font图标 路径错误
 */
module.exports = function (source) {

  if (process.env.NODE_ENV === 'production') {
    return source.replace('__webpack_public_path__ + "static', '"..')
  } else {
    return source
  }

}
