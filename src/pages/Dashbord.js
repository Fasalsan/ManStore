import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout'
import Products from './Products'
import Categories from './Categories'
import User from './User'
import NoPage from './NoPage'
import Order from './Order'

export default function Dashbord() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Categories />} />
          <Route path="product" element={<Products />} />
          <Route path="user" element={<User />} />
          <Route path='order' element={<Order />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
