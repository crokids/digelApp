
import React from 'react';
import { Switch, Form , Input} from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const { TextArea } = Input

const FormPedido = ({ onChangee, nf, tipo_pgt, obs }) => {


  const onFormChange = (changedValues, allValues) => {
        onChangee(allValues)
  };


  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
          marginTop: '20px',
        }}
        initialValues={{
          nf: nf,
          remember: true,
          tipo_pag: tipo_pgt,
          obs: obs,
        }}
        onValuesChange={onFormChange}
        autoComplete="off"
      >

        <Form.Item name="nf" label="Nota Fiscal" valuePropName="checked">
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
          />
        </Form.Item>

        <Form.Item name="tipo_pag" label="Tipo Pagamento">
          <Switch checkedChildren={'AV'} unCheckedChildren={'AP'} />
        </Form.Item>

        <Form.Item name='obs' label='Observação' >
            <TextArea rows={3} maxLength={28} placeholder='Digite a observação aqui...' />
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormPedido;
