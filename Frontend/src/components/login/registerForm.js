import React, { useState } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Select,
  Checkbox,
  Button,
  Radio,
  InputNumber,
  Card,
} from 'antd'
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons'
import axios from 'axios'

const { Option } = Select

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
}
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
}

const normFile = (e) => {
  console.log('Upload event:', e)

  if (Array.isArray(e)) {
    return e
  }

  return e && e.fileList
}

const RegistrationForm = () => {
  const [form] = Form.useForm()
  const [so, setSo] = useState(false)

  const onFinish = (values) => {
    console.log('Received values of form: ', values)
    // , function (base64) {
    //   console.log("new base64:",base64)
    //   setSo(base64)
    // }

    let dataSent = {
      account: values.account,
      name: values.name,
      password: values.password,
      nickname: values.nickname,
      phoneNum: values.phone.toString(),
      emailAddress: values.email,
      sex: values.sex,
      school: values.school,
      college: values.major,
      grade: values.grade,
      studentNumber: values.student_num.toString(),
      intro: values.intro,
    }
    console.log('dataSent:', dataSent)
    axios.post('/user/register', dataSent).then((response) => {
      console.log(response)
      window.alert('注册成功')
    })
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  )

  return (
    <Card className="register-card" title="注册" size="default" bordered={true}>
      <br />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '86',
        }}
        scrollToFirstError
      >
        <Form.Item
          name="account"
          label="账户名"
          rules={[
            {
              type: 'string',
              message: '用户名要是字符串!',
            },

            {
              required: true,
              message: '请输入您的账户名',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: '这不是合法的邮箱!',
            },
            {
              required: true,
              message: '请输入您的邮箱',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号"
          rules={[
            {
              required: true,
              message: '请输入您的手机号',
            },
          ]}
          hasFeedback
        >
          <InputNumber
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入您的密码',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="再次输入密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入密码',
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject('两次密码不相符!')
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="姓名"
          rules={[
            {
              required: true,
              message: '请输入您的姓名',
            },
          ]}
          hasFeedback
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="sex"
          label="性别"
          rules={[
            {
              required: true,
              message: '请选择您的性别',
            },
          ]}
        >
          <Radio.Group>
            <Radio value="male">男</Radio>
            <Radio value="female">女</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="school"
          label="学校"
          rules={[
            {
              required: true,
              message: '请输入您的学校',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="student_num"
          label="学号"
          rules={[
            {
              type: 'number',
              message: '学号必须是数字!',
            },

            {
              required: true,
              message: '请输入您的学号',
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          name="major"
          label="专业"
          rules={[
            {
              required: true,
              message: '请输入您的专业',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="grade"
          label="学历"
          extra="从一年级开始每年加1！"
          rules={[
            {
              type: 'number',
              message: '学历必须是数字!',
            },
            {
              required: true,
              message: '请输入您的学历',
            },
          ]}
        >
          <InputNumber min={1} max={30} />
        </Form.Item>

        <Form.Item
          name="nickname"
          initialValue={Form.name}
          label={
            <span>
              昵称&nbsp;
              <Tooltip title="朋友们要叫你什么呢?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: '请输入您的昵称',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="intro"
          label="个人简介"
          extra="让大家详细地认识你!"
          initialValue={'暂无简介'}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject('需要先阅读并同意以上内容！'),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            我已阅读并同意 <a href="">《用户协议》</a> 及<a href="">《须知》</a>
          </Checkbox>
        </Form.Item>
        <br></br>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          &nbsp;&nbsp;&nbsp;已有账号？<a href="#/login">现在登录！</a>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default RegistrationForm
