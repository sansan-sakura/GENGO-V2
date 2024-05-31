import { CATEGORY_ID_URL, CATEGORY_URL } from '../statics/fetchUrls'
import { NewCategory } from '../types/flashcardTypes'

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
