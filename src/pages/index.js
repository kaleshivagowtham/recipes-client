import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import HomeComponent from '@/components/HomeComponent'
import axios from 'axios'
import { routes } from '@/utils/routes'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '@/features/modal/loginSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {


    return (
      <main>
        <HomeComponent />
      </main>
    )
}
