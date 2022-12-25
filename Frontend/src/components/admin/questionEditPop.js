import React, { useState } from 'react'
import { Button, Modal, Form, Input, Select } from 'antd'
import axios from 'axios'

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

//添加比赛的弹出框
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm()
  const nameValidate = (rule, value, callback) => {
    if (value < 1) {
      callback('组队人数不能小于1人')
    }
    if (value > 100) {
      callback('组队人数不能大于100人')
    } else {
      callback()
    }
  }
  return (
    <Modal
      visible={visible}
      title="添加新选择题"
      okText="确定创建"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields()
            onCreate(values)
          })
          .catch((info) => {
            console.log('Validate Failed:', info)
          })
      }}
    >
      <Form
        form={form}
        layout="horizontal"
        name="form_add_in_modal"
        initialValues={{
          tags: 'not_started',
        }}
      >
        <Form.Item
          name="projectId"
          label="从属比赛ID"
          rules={[
            {
              required: true,
              message: '请输入从属比赛ID',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="question"
          label="问题描述"
          rules={[
            {
              required: true,
              message: '请输入问题描述',
            },
          ]}
        >
          <Input.TextArea
            allowClear={true}
            autoSize={{ minRows: 3, maxRows: 30 }}
            placeholder="pleas enter the question detail"
          />
        </Form.Item>
        <Form.Item
          name="answerA"
          label="选项A"
          rules={[
            {
              required: true,
              message: '请输入选项A',
            },
            // {
            //   validator: nameValidate,
            // },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answerB"
          label="选项B"
          rules={[
            {
              required: true,
              message: '请输入选项B',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answerC"
          label="选项C"
          rules={[
            {
              required: true,
              message: '请输入选项C',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answerD"
          label="选项D"
          rules={[
            {
              required: true,
              message: '请输入选项D',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="score"
          label="分值"
          rules={[
            {
              required: true,
              message: '请输入分值',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="answerRight"
          label="正确选项"
          rules={[
            {
              required: true,
              message: '请选择正确选项',
            },
          ]}
        >
          <Select
            defaultValue=""
            style={{ width: 120 }}
          >
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="level"
          label="难度"
          rules={[
            {
              required: true,
              message: '请选择难度',
            },
          ]}
        >
          <Select
            defaultValue=""
            style={{ width: 120 }}
          >
            <Option value="easy">easy</Option>
            <Option value="middle">middle</Option>
            <Option value="hard">hard</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

//调用按钮
const QuestionPage = () => {
  const [visible, setVisible] = useState(false)

  const onCreate = (values) => {
    console.log('Received values of form: ', values)
    //处理数据
    var data = {
      questionId: '',
      question: values.question,
      answerA: values.answerA,
      answerB: values.answerB,
      answerC: values.answerC,
      answerD: values.answerD,
      level: values.level,
      answerRight: values.answerRight,
      score: values.score,
    }
    console.log('data:', data)
    var token = JSON.parse(localStorage.getItem('token')).token
    var requestUrl = 'choiceQuestion?projectId=' + values.projectId
    console.log(token)
    axios.post(requestUrl, data, { headers: { token: token } }).then((res) => {
      console.log(res)
    })
    setVisible(false)
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true)
        }}
        style={{ marginBottom: 10 }}
      >
        新建题目
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false)
        }}
      />
    </div>
  )
}

export default QuestionPage
