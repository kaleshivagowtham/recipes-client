import { useEffect } from 'react'
import { Inter } from 'next/font/google'
import HomeComponent from '@/components/HomeComponent'
import axios from 'axios'
import { routes } from '@/utils/routes'
import { useSelector, useDispatch } from 'react-redux'
import { loginAction } from '@/features/modal/loginSlice'

const inter = Inter({ subsets: ['latin'] })

export default function Home({latestList,error, nothing}) {

    return (
      <main>
        <HomeComponent latestList={latestList} error={error}/>
      </main>
    )
}

export async function getServerSideProps() {

  try {
      const getAllRecipeUrl = `${routes.baseUrl}${routes.api.getallrecipe}`;
      
      const response = await axios.get(getAllRecipeUrl);
      const latestList = response.data;

      return { 
        props: { 
          latestList: latestList 
        } 
      };

    } 
    catch (error) {
      return 
      { props: {
        error: error.message 
        } 
      };
  }
}
