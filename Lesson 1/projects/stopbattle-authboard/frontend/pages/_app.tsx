import '../styles/antd.font.css';
import '../styles/globals.css'
import 'antd-button-color/dist/css/style.css';
import {SessionProvider, useSession} from "next-auth/react"
import {RecoilRoot} from 'recoil';
import MainLayout from '../components/layouts/layout'
import {Spin} from "antd";
import { ConfigProvider } from 'antd';
import ukUA from 'antd/lib/locale/uk_UA';

//@ts-ignore
export default function App({Component, pageProps: { session, ...pageProps }, }) {
  const getLayout = Component.getLayout || ((page: any) => <MainLayout>{page}</MainLayout>)
  return (
      <SessionProvider session={session}>
        <RecoilRoot>
            <ConfigProvider locale={ukUA}>
          { getLayout(
              Component.auth && Component.admin ?
                  (
                      <AdminAuth>
                        <Component {...pageProps} />
                      </AdminAuth>
                  )
                  :
                  (
                      <Component {...pageProps} />
                  )
          )
          }
            </ConfigProvider>
        </RecoilRoot>
      </SessionProvider>
  )
}

function AdminAuth({ children } : any) {
  const { data: session, status } = useSession({ required: true })
  const isUser = session?.user
  const isAdmin = session?.isAdmin;
  if(status !== 'loading') {
    if (isUser) {
      if (isAdmin) {
        return children
      } else {
        if (typeof window !== 'undefined') {
          window.location.replace('/403');
        }
      }
    }
  }
  return (
      <div>
        <Spin />
        <p>Перевірка контексту безпеки...</p>
      </div>
  );
}
