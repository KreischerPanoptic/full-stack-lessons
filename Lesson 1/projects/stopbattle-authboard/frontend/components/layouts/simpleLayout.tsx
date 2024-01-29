import Link from 'next/link';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { Layout, Menu } from 'antd';
import React, {useState, useEffect} from 'react';
import {useSession} from "next-auth/react";

const { Header, Content } = Layout;
// @ts-ignore
export default function SimpleLayout({ children }) {
    const size = useWindowSize();
    const { data: session, status } = useSession();
    return (
        <Layout >
            {session ? <Header style={{ position: 'fixed', zIndex: 1, width: '100%', padding: '0', background: '#FFFFFF', stroke: '#DBDBDB' }}>
                <Menu style={{stroke: '#DBDBDB', boxShadow: "4px 8px 15px 0px rgba(225, 225, 225, 0.6)"}} mode="horizontal" defaultSelectedKeys={['1']}>
                    <Link href='/'><a><Menu.Item key="0" >
                        <div style={{marginTop: '16px'}} className={styles.logo}>
                            <Image id='logo' src='/images/logo.svg' width='200px' height='80px'/>
                        </div>
                    </Menu.Item></a></Link>
                    {size.width ? size.width < 500 ? null :
                        <div style={{marginLeft: 'auto', display: 'flex'}}>
                            <Menu.Item style={{marginTop: '6px'}} key="1"><Link href='https://stopbattle.org'>Пошук</Link></Menu.Item>
                            <Menu.Item style={{marginTop: '6px'}} key="2"><Link href='https://volunteer.stopbattle.org'>Волонтер</Link></Menu.Item>
                            <Menu.Item style={{marginTop: '6px'}} disabled key="3"><b style={{color: 'black'}}>Залишайтесь людьми</b></Menu.Item>
                        </div>: null}
                </Menu>
            </Header> : null}
            <Content className="site-layout" style={{ padding: '0 50px', paddingTop: 84, height:"100vh", background: '#FFFFFF', backgroundSize: 'cover' }}>
                <div style={{
                    position: 'relative',
                    top: '15%',
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
        </Layout>
    )
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // only execute all the code below in client side
        if (typeof window !== 'undefined') {
            // Handler to call on window resize
            // @ts-ignore
            function handleResize() {
                // Set window width/height to state

                setWindowSize({
                    // @ts-ignore
                    width: window.innerWidth,
                    // @ts-ignore
                    height: window.innerHeight,
                });
            }

            // Add event listener
            window.addEventListener("resize", handleResize);

            // Call handler right away so state gets updated with initial window size
            handleResize();

            // Remove event listener on cleanup
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}
