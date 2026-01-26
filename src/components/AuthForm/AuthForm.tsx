import {Button, Checkbox, Form, Input} from "antd";

export const AuthForm = () => {

    const [form] = Form.useForm();

return (
    <>
    <Form form={form} size="large">
        <Form.Item
            label="Email"
            layout='vertical'
            name='email'
            rules={[{required: true, message: 'Введите email'}]}
        >
            <Input/>
        </Form.Item>
        <Form.Item
            label="Password"
            layout='vertical'
            name='password'
            rules={[{required: true, message: 'Введите пароль'}]}
        >
            <Input.Password/>
        </Form.Item>
            <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>
        <Form.Item>
            <Button
                block
                type="primary"
                htmlType="submit"
                size="large"
                color="purple"
                variant="solid"
            >
                Log in
            </Button>
        </Form.Item>
    </Form>
    </>
)

}