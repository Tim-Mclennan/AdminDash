import { ThemedLayoutV2 } from "@refinedev/antd"
import Header from "./Header"
import { LineChartOutlined } from '@ant-design/icons'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={() => <><LineChartOutlined style={{ fontSize: '2rem' }} /><h1>AdminDash</h1></>}
    >
      {children}
    </ThemedLayoutV2>
  )
}

export default Layout