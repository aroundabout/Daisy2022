import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import axios from 'axios'
import { setToken } from '../../utils/auth'

axios.defaults.headers.post['Content-Type'] = 'application/json' //配置请求头
axios.defaults.baseURL = '/api'

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    axios({
      method: 'post',
      url: 'user/login',
      data: JSON.stringify({
        account: values.username,
        password: values.password,
      }),
    })
      .then((response) => {
        console.log(response)
        setToken(response.data.detail.token, values.username)
        if (response.data.detail.admin === 0) {
          window.location.href = '#/homePage'
        } else {
          window.location.href = '#/admin'
        }
        window.alert('登陆成功')

      })
      .catch(function (error) {
        window.alert('登陆失败')
      })
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名！',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="手机号或邮箱"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码！',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
        &nbsp;&nbsp;&nbsp;没有账号？<a href="#/register">现在注册！</a>
      </Form.Item>
    </Form>
  )
}

export default NormalLoginForm
