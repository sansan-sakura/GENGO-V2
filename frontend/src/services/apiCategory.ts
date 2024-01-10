import { CATEGORY_ID_URL, CATEGORY_URL } from '../statics/fetchUrls'
import { NewCategory } from '../types/flashcardTypes'

export async function getCategories(token: any) {
  try {
    const res = await fetch(CATEGORY_URL, {
      method: 'GET',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    if (data.status === 'fail' || data.status === 'error') {
      throw new Error(data.message)
    }
    return data
  } catch (err: any) {
    console.log(err)
  }
}

export async function createCategory(body: NewCategory, token: any) {
  try {
    const res = await fetch(CATEGORY_URL, {
      method: 'POST',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message)
    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function deleteCategory(id: number | string, token: any) {
  try {
    const res = await fetch(CATEGORY_ID_URL(id), {
      method: 'DELETE',
      headers: { Authorization: token },
    })
    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message)

    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}

export async function updateCategory(
  id: number | string,
  body: { category: string },
  token: any,
) {
  try {
    const res = await fetch(CATEGORY_ID_URL(id), {
      method: 'PUT',
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    const data = await res.json()
    if (data.status !== 'success') throw new Error(data.message)
    return data
  } catch (err: any) {
    throw new Error(err.message)
  }
}
