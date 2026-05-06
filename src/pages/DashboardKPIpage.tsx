import {Radio, type RadioChangeEvent, Select, Space, Tabs, type TabsProps} from "antd";
import {useState} from "react";

export const DashboardKPIpage = () => {
    const [tabPlacement, setTabPlacement] = useState<TabsProps['tabPlacement']>('top');

    const changeTabPlacement = (e: RadioChangeEvent) => {
        setTabPlacement(e.target.value);
    };

    const onChange = (key: string) => {
        console.log(key);
    };

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
                <Tabs
                    size="large"
                    onChange={onChange}
                    type="card"
                    items={Array.from({ length: 3 }).map((_, i) => {
                        const id = String(i + 1);
                        return {
                            label: `Tab ${id}`,
                            key: id,
                            children: `Content of Tab Pane ${id}`,
                        };
                    })}
                />
            </div>
            <div>
                <div style={{width: '600px', height: '300px', backgroundColor: '#ffc1c1'}}>

                </div>
            </div>

        </div>
    )
}