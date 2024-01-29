import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import {Layout, Menu, Button} from 'antd';
import React, {useState, useEffect} from 'react';
import Link from "next/link";
import MainLayout from "./layout";
import {signOut, useSession} from "next-auth/react";
import {UserOutlined} from "@ant-design/icons";
import {VERSION} from "../../config/config";

const { Header, Content } = Layout;
const { SubMenu } = Menu;
// @ts-ignore
export default function AdminLayout({ children }) {
    const { data: session, status } = useSession();
    return (
        session && session.isAdmin && status === 'authenticated' ?
            <Layout>
                {session ? <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0', background: '#FFFFFF', stroke: '#DBDBDB' }}>
                <Menu style={{stroke: '#DBDBDB', boxShadow: "4px 8px 15px 0px rgba(225, 225, 225, 0.6)"}} mode="horizontal" defaultSelectedKeys={['1']}>
                    <Link href='/'><a><Menu.Item key="0" >
                        <div style={{marginTop: '16px'}} className={styles.logo}>
                            <Image id='logo' src='/images/logo.svg' width='200px' height='80px'/>
                        </div>
                    </Menu.Item></a></Link>
                    <Menu.Item style={{marginTop: '6px'}} key="1"><Link href={'/users'}>Користувачі</Link></Menu.Item>
                    <Menu.Item style={{marginTop: '6px'}} key="2"><Link href={'/regions'}>Регіони</Link></Menu.Item>
                    <Menu.Item style={{marginTop: '6px'}} key="3"><Link href={'/logs'}>Логи</Link></Menu.Item>
                    <SubMenu key="usersub" style={{marginLeft: 'auto', marginTop: '6px', display: 'flex'}} icon={<UserOutlined />} title={`Вітаємо, ${
                        //@ts-ignore
                        `${session?.user?.first_name}`.length > 0 && (session?.user?.first_name !== 'undefined' && session?.user?.first_name !== 'null') ? session?.user?.first_name : session?.username
                    }`}>
                        <Menu.Item key="4" style={{width: '100%'}}><Link href='/profile'><a>{`Редагувати профіль`}</a></Link></Menu.Item>
                        <Menu.Item key="5" style={{width: '100%'}}><span style={{color: '#00779d'}}>{`Оновлення v${VERSION}`}</span></Menu.Item>
                        <Menu.Item key="6">
                            <Button type='default' danger onClick={async () => await signOut()} style={{color: 'red', width: '100%'}} color='red'>Вийти</Button>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Header> : null}
            <Content className="site-layout" style={{ padding: '0 50px', paddingTop: 84, height:"100vh", background: '#FFFFFF', backgroundSize: 'cover' }}>
                <div style={{
                    position: 'relative',
                    top:"2%",
                    textAlign: 'center'
                }}>
                    <main>
                        {children}
                    </main>
                </div>
            </Content>
            <Head>
                <title>Authentication</title>
                <meta charSet="utf-8"/>
                <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f9b00c"/>
                <meta name="msapplication-TileColor" content="#f9b00c"/>
                <meta name="msapplication-TileImage" content="/mstile-144x144.png"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="apple-mobile-web-app-title" content="Authentication"/>
                <meta name="application-name" content="Authentication"/>
                <link rel="icon" href="/icons/favicon.ico"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta
                    name="description"
                    content="Authentication"
                />
            </Head>
            <noscript>
                <div
                    style={{  position: 'fixed',
                        top: '0px',
                        left: '0px',
                        zIndex: '30000000',
                        height: '100%',
                        width: '100%',
                        backgroundColor: '#FFFFFF'}}>
                    <img
                        style={{
                            position: 'relative',
                            left: '50%',
                            top: '20%',
                            transform: 'translate(-50%)'
                        }}
                        src="images/mascot.png" alt="mascot"/>
                    <h2
                        style={{
                            position: 'fixed',
                            left: '50%',
                            top: '45%',
                            textAlign: 'center',
                            transform: 'translate(-50%)'
                        }}
                    >
                        Ой-ой, здається ваш браузер не підтримує JavaScript, або ви вимкнули його...<br/>
                        На жаль, без JavaScript ми не можемо коректно показати сторінку на вашому пристрої.<br/>
                        Будь ласка, увімкніть JavaScript, або оновіть ваш веб переглядач.
                    </h2>
                </div>
            </noscript>
        </Layout> : <MainLayout>{children}</MainLayout>
    )
}
