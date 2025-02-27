<script setup lang="ts">
import type { Login, User, ProductList, SpecialProduct } from '@/types'

const login: Login = {
  username: 'admin',
  password: '123'
}

const user: User = {
  id: 1,
  name: 'admin',
  email: 'admin@admin.com',
  phone: '0987654321',
  address: 'sss'
}

const productList: ProductList = {
  id: 1,
  name: 'car',
  price: 100,
  stock: 100,
  status: 'active',
  Pagination: {
    page: 1,
    pageSize: 10,
    total: 100
  }
}

const specialProduct: SpecialProduct = {
  id: 1,
  name: 'super car',
  price: 100,
  stock: 100,
  status: 'active',
  Pagination: {
    page: 1,
    pageSize: 10,
    total: 100
  },
  category: 'classic'
}

console.log(login, user, productList, specialProduct)
</script>
<template>
  <div>
    <h1>Types</h1>
  </div>
</template>
