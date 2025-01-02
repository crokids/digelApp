'use client'

import React, { useState, useEffect } from 'react';
import { UserOutlined, LeftCircleFilled, SearchOutlined, 
  ShopOutlined,
  SendOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/clerk-react'

const { Sider, Content, Footer } = Layout;


const BackGround = ({ content, mainContent, MainFormPedido, Order, buscar }) => {
  const [margin, setMargin] = useState(80);
  const [collapsed, setCollapsed] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false)
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { user } = useUser()

  useEffect(() => {
    if (user && user.username === 'admin') {
      setIsAdmin(true);
    }
  }, [user]);



  const menuItems = [
    {
      key: '1',
      icon: <UserButton afterSignOutUrl='/'/>,
      style: {marginBottom: '30px', display: 'flex', justifyContent: 'center', alignItems: 'center'}
    },
    {
      key: '2',
      icon: <LeftCircleFilled />,
      label: <a href='/'>voltar</a>,
      style: { marginBottom: '10px' }
    },
    {
      key: '3',
      icon: <SendOutlined />,
      label: <a href='/order'>Pedido</a>,
      style: { marginBottom: '10px' }
    },
    {
      key: '4',
      icon: <UserOutlined />,
      label: <a href='/tableclient'>Cliente</a>,
      style: { marginBottom: '10px' }
    },
    {
      key: '5',
      icon: <SearchOutlined />,
      label: <a href='/pedidos'>buscar</a>,
      style: { marginBottom: '10px' }
    },
    {
      key: '6',
      icon: <ShopOutlined />,
      label: <a href='#'>Estoque</a>,
      style: { marginBottom: '10px' }
    }
  ];



  const finalMenuItems = isAdmin ? menuItems : menuItems.slice(0, -2)


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
          items={finalMenuItems}
          style={{ marginTop: '30px' }}
        />
      </Sider>
      <Layout
        style={{
          marginLeft: margin,
        }}
      >
       
        <Content className='m-0 md:m-10 overflow-auto'>
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
            {Order}
            {buscar}
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
