import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NavigationManu from '@/components/shared/navigationMenu/NavigationMenu'
import Header from '@/components/shared/header/Header'
import useBootstrapUtils from '@/hooks/useBootstrapUtils'

const RootLayout = () => {
    const pathName = useLocation().pathname
    useBootstrapUtils(pathName)

    return (
        <div style={{
            marginTop: "-5rem"
        }}>
            {/* <Header /> */}
            <NavigationManu />
            <main className="nxl-container" >
                <div className="nxl-content">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}

export default RootLayout