'use client'

import React, { useState } from 'react';
import { UserOutlined, LeftCircleFilled, AppstoreOutlined, ShopOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { UserButton } from '@clerk/nextjs';

const { Header, Sider, Content, Footer } = Layout;


const BackGround = ({ content, mainContent, MainFormPedido }) => {
  const [margin, setMargin] = useState(200);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();



  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value)
          if(value === true ) {
            setMargin(80)
          }else setMargin(200)

        }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectable={false}
          mode="inline"
          items={[
            {
              key: '5',
              icon: <UserButton afterSignOutUrl='/'/>,
              style: {marginBottom: '30px'}
            },
            {
              key: '1',
              icon: <LeftCircleFilled />,
              label: <a href='/'>voltar</a>,
              style: {marginBottom: '10px'}
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: <a href='/tableclient'>Cliente</a>,
              style: {marginBottom: '10px'}
            },
            {
              key: '3',
              icon: <AppstoreOutlined  />,
              label: <a href='#'>Produção</a>,
              style: {marginBottom: '10px'}
            },
            {
              key: '4',
              icon: <ShopOutlined />,
              label: <a href='#'>Estoque</a>,
              style: {marginBottom: '10px'}
            },
           

          ]}
          style={{ marginTop: '30px' }}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: margin,
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '24px 16px 0',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: 24,
              textAlign: 'center',
              minHeight: 580,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {mainContent}
            {content}
            {MainFormPedido}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Victor Fazekas
        </Footer>
      </Layout>
    </Layout>
  );
};
export default BackGround;