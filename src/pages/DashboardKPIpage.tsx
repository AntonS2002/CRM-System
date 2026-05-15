import {Breadcrumb, Card, Col, Radio, type RadioChangeEvent, Row, Select, Space, Statistic, type TabsProps} from "antd";
import {useState} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {TableKpi} from "../components/TableKpi/TableKpi.tsx";
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
export const DashboardKPIpage = () => {
    const [tabPlacement, setTabPlacement] = useState<TabsProps['tabPlacement']>('top');

    const changeTabPlacement = (e: RadioChangeEvent) => {
        setTabPlacement(e.target.value);
    };

    const data = [
        {name: 'Vasya', age: 32},
        {name: 'WQE', age: 31},
        {name: 'dsgrs', age: 22},
        {name: 'Fyjyjr5', age: 44},
        {name: 'FXAWED1', age: 31},
        {name: 'FXAWED2', age: 32},
        {name: 'FXAWED3', age: 35},
        {name: 'FXAWED4', age: 66},
        {name: 'FXAWED5', age: 75},
    ]

    return (
        <div style={{margin: '3rem'}}>
            <div style={{margin: '1rem', display: 'flex', gap: '3rem'}}>
                <Space style={{ marginBottom: 10 }}>
                    Период:
                    <Radio.Group value={tabPlacement} onChange={changeTabPlacement}>
                        <Radio.Button value="top">День</Radio.Button>
                        <Radio.Button value="bottom">Неделя</Radio.Button>
                        <Radio.Button value="start">Месяц</Radio.Button>
                        <Radio.Button value="end">Год</Radio.Button>
                    </Radio.Group>
                </Space>
                <Select
                    defaultValue={'OEE'}
                    style={{ width: '120px' }}
                    options={[
                        { value: 'oee', label: 'OEE' },
                        { value: 'margin', label: 'Маржа' },
                    ]}
                />
            </div>
            <div>
                <Breadcrumb
                    separator=">"
                    style={{fontSize: '1rem', display: 'flex', justifyContent: 'center'}}
                    items={[
                        {
                            title: 'Холдинг',
                            href: '',
                        },
                        {
                            title: 'Предприятие',
                            href: '',
                        },
                        {
                            title: 'Площадка',
                            href: '',
                        },
                        {
                            title: 'Цех',
                            href: '',
                        },
                    ]}
                />
            </div>
            <div style={{margin: '1rem', display: 'flex', justifyContent: 'center', gap: '7rem'}}>
                <div style={{width: '800px', height: '400px'}}>
                    <Card title="Карточка KPI" variant="borderless" style={{ width: '100%', height: '100%' }}>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Card variant="borderless">
                                    <Statistic
                                        title="Active"
                                        value={11.28}
                                        precision={2}
                                        styles={{ content: { color: '#3f8600' } }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card variant="borderless">
                                    <Statistic
                                        title="Idle"
                                        value={9.3}
                                        precision={2}
                                        styles={{ content: { color: '#cf1322' } }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Statistic title="OEE:" value={112893} />
                                <Statistic title="Маржинальность:" value={112893} />
                                <Statistic title="Загрузка мощностей:" value={112893} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Выработка:" value={112893} />
                                <Statistic title="Простои:" value={112893} />
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div style={{width:'800px', height: '400px', backgroundColor:'#fff', borderRadius: '10px'}}>
                    <ResponsiveContainer width="100%" height='100%'>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis dataKey="age" />
                            <Tooltip />
                            <Line type="monotone" dataKey="age" stroke="#1677ff" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div>
                <TableKpi/>
            </div>

        </div>
    )
}