import {Breadcrumb, Card, Col, Radio, type RadioChangeEvent, Row, Select, Space, Statistic, type TabsProps} from "antd";
import {useState} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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
        {name: 'FXAWED', age: 35},
        {name: 'FXAWED', age: 35},
        {name: 'FXAWED', age: 35},
        {name: 'FXAWED', age: 35},
        {name: 'FXAWED', age: 35},
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
                <div style={{width:'800px', height: '400px'}}>
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

        </div>
    )
}